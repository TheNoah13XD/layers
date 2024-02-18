import { collection, doc, getDocs, query, where, orderBy, getDoc, limit, startAt } from "firebase/firestore";
import { groupsRef, postsRef, usersRef } from "@firebase";
import { startOfDay, subWeeks } from 'date-fns';

import { Goals, Record, Group, Member, Post } from "@types";

export const fetchRecords = async (userId: string, startDate?: Date, endDate?: Date) => {
    const userDoc = doc(usersRef, userId);
    const recordsRef = collection(userDoc, 'records');

    const start = startDate ? startOfDay(startDate) : startOfDay(subWeeks(new Date(), 2));
    const end = endDate ? startOfDay(endDate) : startOfDay(new Date());

    const q = query(recordsRef, where('date', '>=', start), where('date', '<=', end), orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);

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

    return records;
};

export const fetchNextRecords = async (userId: string, recordId: string) => {
    const userDoc = doc(usersRef, userId);
    const recordsRef = collection(userDoc, 'records');

    const recordDoc = doc(recordsRef, recordId);
    const recordSnap = await getDoc(recordDoc);

    const q = query(recordsRef, orderBy('date', 'desc'), startAt(recordSnap), limit(7));
    const querySnapshot = await getDocs(q);

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

    return records;
};

export const fetchGroupRecommendations = async (userId: string, goals: Array<keyof Goals>) => {
    const q = query(groupsRef, where('tags', 'array-contains-any', goals));
    const querySnapshot = await getDocs(q);

    const groups: Group[] = [];
    for (const doc of querySnapshot.docs) {
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

        const members = await fetchMembers(group);

        if (!members.some(member => member.id === userId)) {
            groups.push(group);
        }
    }

    return groups;
}

export const fetchMembers = async (group: Group) => {
    const groupDoc = doc(groupsRef, group.id);
    const membersRef = collection(groupDoc, 'members');
    const querySnapshot = await getDocs(membersRef);

    const members: Member[] = [];
    querySnapshot.forEach((doc) => {
        const data = doc.data();

        members.push({
            id: doc.id,
            username: data.username,
            role: data.role
        });
    });

    return members;
}

export const fetchGroups = async () => {
    const q = query(groupsRef);
    const querySnapshot = await getDocs(q);

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

    return groups;
}

export const fetchGroup = async (groupId: string) => {
    const groupDoc = doc(groupsRef, groupId);
    const groupSnap = await getDoc(groupDoc);

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

    return group;
}

export const fetchPosts = async (groupId: string) => {
    const q = query(postsRef, where('groupId', '==', groupId));
    const querySnapshot = await getDocs(q);

    const posts: any[] = [];
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

    return posts;
}
