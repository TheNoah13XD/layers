import { collection, doc, query, where, orderBy, limit, startAt, setDoc, onSnapshot, updateDoc, increment, getDoc, deleteDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { groupsRef, postsRef, usersRef } from "@firebase";
import { startOfDay, subWeeks } from 'date-fns';

import { Goals, Record, Group, Member, Post } from "@types";

// query functions
export const fetchRecords = (userId: string, callback: (records: Record[]) => void, startDate?: Date, endDate?: Date) => {
    const userDoc = doc(usersRef, userId);
    const recordsRef = collection(userDoc, 'records');

    const start = startDate ? startOfDay(startDate) : startOfDay(subWeeks(new Date(), 2));
    const end = endDate ? startOfDay(endDate) : startOfDay(new Date());

    const q = query(recordsRef, where('date', '>=', start), where('date', '<=', end), orderBy('date', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const records: Record[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();

            records.push({
                id: doc.id,
                date: data.date,
                day: data.day,
                feels: data.feels,
                journal: data.journal,
                score: data.score
            });
        });

        callback(records);
    });

    return unsubscribe;
};

export const fetchNextRecords = async (userId: string, recordId: string, callback: (records: Record[]) => void) => {
    try {
        const userDoc = doc(usersRef, userId);
        const recordsRef = collection(userDoc, 'records');

        const recordSnapshot = await getDoc(doc(recordsRef, recordId));
        const q = query(recordsRef, orderBy('date', 'desc'), startAt(recordSnapshot), limit(7));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const records: Record[] = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();

                records.push({
                    id: doc.id,
                    date: data.date,
                    day: data.day,
                    feels: data.feels,
                    journal: data.journal,
                    score: data.score
                });
            });

            callback(records);
        });

        return unsubscribe;
    } catch (error) {
        console.error(error);
        return () => {};
    }
};

export const fetchGroupRecommendations = (userId: string, goals: Array<keyof Goals>, callback: (groups: Group[]) => void) => {
    const q = query(groupsRef, where('tags', 'array-contains-any', goals));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const groups: Group[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();

            const group: Group = {
                id: doc.id,
                name: data.name,
                members: data.members,
                owner: data.owner,
                ownerUsername: data.ownerUsername,
                description: data.description,
                tags: data.tags
            };

            fetchMembers(group, (members) => {
                if (!members.some(member => member.id === userId)) {
                    groups.push(group);
                }

                callback(groups);
            });
        });
    });

    return unsubscribe;
}

export const fetchMembers = (group: Group, callback: (members: Member[]) => void) => {
    const groupDoc = doc(groupsRef, group.id);
    const membersRef = collection(groupDoc, 'members');

    const unsubscribe = onSnapshot(membersRef, (querySnapshot) => {
        const members: Member[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();

            members.push({
                id: doc.id,
                username: data.username,
                role: data.role
            });
        });

        callback(members);
    });

    return unsubscribe;
}

export const fetchGroups = (callback: (groups: Group[]) => void) => {
    const q = query(groupsRef);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const groups: Group[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();

            groups.push({
                id: doc.id,
                name: data.name,
                members: data.members,
                owner: data.owner,
                ownerUsername: data.ownerUsername,
                description: data.description,
                tags: data.tags
            });
        });

        callback(groups);
    });

    return unsubscribe;
}

export const fetchGroup = (groupId: string, callback: (group: Group) => void) => {
    const groupDoc = doc(groupsRef, groupId);

    const unsubscribe = onSnapshot(groupDoc, (groupSnap) => {
        const data = groupSnap.data();

        if (!data) {
            throw new Error(`No group found with id: ${groupId}`);
        }

        const group: Group = {
            id: groupSnap.id,
            name: data.name,
            members: data.members,
            owner: data.owner,
            ownerUsername: data.ownerUsername,
            description: data.description,
            tags: data.tags
        };

        callback(group);
    });

    return unsubscribe;
}

export const fetchPosts = (groupId: string, callback: (posts: Post[]) => void) => {
    const q = query(postsRef, where('groupId', '==', groupId));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const posts: Post[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();

            posts.push({
                id: doc.id,
                user: data.userId,
                username: data.username,
                time: data.time,
                groupId: data.groupId,
                groupName: data.groupName,
                content: data.content,
                likedBy: data.likedBy
            });
        });

        callback(posts);
    });

    return unsubscribe;
}

export const fetchPostsOfUser = (userId: string, callback: (posts: Post[]) => void) => {
    const q = query(postsRef, where('user', '==', userId));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const posts: Post[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();

            posts.push({
                id: doc.id,
                user: data.userId,
                username: data.username,
                time: data.time,
                groupId: data.groupId,
                groupName: data.groupName,
                content: data.content,
                likedBy: data.likedBy
            });
        });

        callback(posts);
    });

    return unsubscribe;
}

// write functions
export const addMember = async (group: Group, userId: string, username: string) => {
    const groupDoc = doc(groupsRef, group.id);
    const membersRef = collection(groupDoc, 'members');

    const member = {
        userId,
        username,
        role: 'member'
    };

    await setDoc(doc(membersRef, userId), member);
    await updateDoc(groupDoc, {
        members: increment(1)
    });

    return member;
}

export const removeMember = async (group: Group, userId: string) => {
    const groupDoc = doc(groupsRef, group.id);
    const memberDoc = collection(groupDoc, 'members');

    await deleteDoc(doc(memberDoc, userId));
    await updateDoc(groupDoc, {
        members: increment(-1)
    });

    return;
}

export const addLike = async (postId: string, userId: string) => {
    const postDoc = doc(postsRef, postId);

    await updateDoc(postDoc, {
        likedBy: arrayUnion(userId)
    });

    return;
}

export const removeLike = async (postId: string, userId: string) => {
    const postDoc = doc(postsRef, postId);

    await updateDoc(postDoc, {
        likedBy: arrayRemove(userId)
    });

    return;
}
