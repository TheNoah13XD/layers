import { collection, doc, query, where, orderBy, limit, startAt, setDoc, onSnapshot, updateDoc, increment, getDoc, deleteDoc, arrayUnion, arrayRemove, Timestamp, getDocs } from "firebase/firestore";
import { chatsRef, groupsRef, postsRef, usersRef } from "@firebase";
import { startOfDay, subWeeks } from 'date-fns';

import { Goals, Record, Group, Member, Post, Journal, SignalRequest, User, Message } from "@types";

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

export const fetchTodayJournal = (userId: string, callback: (journal: Journal | null) => void) => {
    try {
        const userDoc = doc(usersRef, userId);
        const journalRef = collection(userDoc, 'journals');
    
        const now = new Date();
        const todayStart = Timestamp.fromDate(new Date(now.getFullYear(), now.getMonth(), now.getDate()));
        const tomorrowStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        tomorrowStart.setHours(0, 0, 0, 0);
        const tomorrowStartTimestamp = Timestamp.fromDate(tomorrowStart);
    
        const q = query(journalRef, where('date', '>=', todayStart), where('date', '<', tomorrowStartTimestamp));
    
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let journal: Journal | null = null;
            querySnapshot.forEach((doc) => {
                const data = doc.data();
    
                journal = {
                    id: doc.id,
                    date: data.date
                };
            });
    
            callback(journal);
        });
    
        return unsubscribe;
    } catch (error) {
        console.error(error);
        return () => {};
    }
};

export const fetchUsers = (ids: string[], callback: (users: User[]) => void) => {
    const users: User[] = [];
    const unsubscribes: (() => void)[] = [];

    ids.forEach(id => {
        if (id.trim() !== '') {
            const userRef = doc(usersRef, id);

            const unsubscribe = onSnapshot(userRef, (docSnap) => {
                const data = docSnap.data();

                const user: User = {
                    id: docSnap.id,
                    email: data?.email,
                    name: data?.name,
                    username: data?.username,
                    bio: data?.bio,
                    role: data?.role,
                    score: data?.score
                };

                users.push(user);

                callback(users);
            });

            unsubscribes.push(unsubscribe);
        }
    });

    return () => unsubscribes.forEach(unsubscribe => unsubscribe());
}

export const fetchUser = (userId: string, callback: (user: User) => void) => {
    const userDoc = doc(usersRef, userId);

    const unsubscribe = onSnapshot(userDoc, (userSnap) => {
        const data = userSnap.data();

        if (!data) {
            throw new Error(`No user found with id: ${userId}`);
        }

        const user: User = {
            id: userSnap.id,
            email: data.email,
            name: data.name,
            username: data.username,
            bio: data.bio,
            role: data.role,
            score: data.score,
        }

        callback(user);
    });

    return unsubscribe;
};

export const fetchUserUsingUsername = (username: string, callback: (user: User) => void) => {
    const q = query(usersRef, where('username', '==', username));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const data = doc.data();

            const user: User = {
                id: doc.id,
                email: data.email,
                name: data.name,
                username: data.username,
            };

            callback(user);
        });
    });

    return unsubscribe;
}

export const fetchUserSignalRequests = (userId: string, callback: (signals: SignalRequest[]) => void) => {
    const userDoc = doc(usersRef, userId);
    const signalsRef = collection(userDoc, 'signals');

    const q = query(signalsRef, orderBy('time', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const signals: SignalRequest[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();

            signals.push({
                id: doc.id,
                time: data.time,
                username: data.username
            });
        });

        callback(signals);
    });

    return unsubscribe;
};

export const fetchGroupRecommendations = (userId: string, goals: Array<keyof Goals>, callback: (groups: Group[]) => void) => {
    const q = query(groupsRef, where('tags', 'array-contains-any', goals), limit(3));

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
};

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
};

export const fetchSeekers = (callback: (seekers: User[]) => void) => {
    const q = query(usersRef, where('role', '==', 'seeker'), where('signal', '==', ''));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const seekers: User[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();

            seekers.push({
                id: doc.id,
                email: data.email,
                name: data.name,
                username: data.username,
                bio: data.bio,
                role: data.role,
                score: data.score,
                goals: data.goals,
            });
        });

        callback(seekers);
    });

    return unsubscribe;
};

export const fetchSeekersRequests = (userId: string): Promise<SignalRequest[]> => {
    return new Promise((resolve, reject) => {
        const userDoc = doc(usersRef, userId);
        const seekersRef = collection(userDoc, 'signals');

        const q = query(seekersRef, orderBy('time', 'desc'));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const requests: SignalRequest[] = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();

                const request: SignalRequest = {
                    id: doc.id,
                    time: data.time,
                    username: data.username
                };

                requests.push(request);
            });

            resolve(requests);
        }, reject);

        return unsubscribe;
    });
};

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
};

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
};

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
                likedBy: data.likedBy,
                reportedBy: data.reportedBy
            });
        });

        callback(posts);
    });

    return unsubscribe;
};

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
                likedBy: data.likedBy,
                reportedBy: data.reportedBy
            });
        });

        callback(posts);
    });

    return unsubscribe;
};

export const fetchPostsOfUserGroups = (groupIds: string[], callback: (posts: Post[]) => void) => {
    const q = query(postsRef, where('groupId', 'in', groupIds));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const posts: Post[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();

            posts.push({
                id: doc.id,
                user: data.user,
                username: data.username,
                time: data.time,
                groupId: data.groupId,
                groupName: data.groupName,
                content: data.content,
                likedBy: data.likedBy,
                reportedBy: data.reportedBy
            });
        });

        callback(posts);
    });

    return unsubscribe;
};

export const fetchMessages = (roomId: string, callback: (messages: Message[]) => void) => {
    const docRef = doc(chatsRef, roomId);
    const messagesRef = collection(docRef, 'messages');

    const q = query(messagesRef, orderBy('time'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messages: Message[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();

            messages.push({
                id: doc.id,
                userId: data.userId,
                message: data.message,
                username: data.username,
                role: data.role,
                time: data.time
            });
        });

        callback(messages);
    });

    return unsubscribe;
};

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
};

export const removeMember = async (group: Group, userId: string) => {
    const groupDoc = doc(groupsRef, group.id);
    const memberDoc = collection(groupDoc, 'members');

    await deleteDoc(doc(memberDoc, userId));
    await updateDoc(groupDoc, {
        members: increment(-1)
    });

    return;
};

export const addLike = async (postId: string, userId: string) => {
    const postDoc = doc(postsRef, postId);

    await updateDoc(postDoc, {
        likedBy: arrayUnion(userId)
    });

    return;
};

export const removeLike = async (postId: string, userId: string) => {
    const postDoc = doc(postsRef, postId);

    await updateDoc(postDoc, {
        likedBy: arrayRemove(userId)
    });

    return;
};

export const createJournal = async (userId: string) => {
    const userDoc = doc(usersRef, userId);
    const journalRef = collection(userDoc, 'journals');
    const recordsRef = collection(userDoc, 'records');

    const now = new Date();
    const todayStart = Timestamp.fromDate(new Date(now.getFullYear(), now.getMonth(), now.getDate()));

    const journal = await setDoc(doc(journalRef), {
        date: todayStart
    });

    const q = query(recordsRef, where('date', '==', todayStart));

    getDocs(q).then((querySnapshot) => {
        if (!querySnapshot.empty) {
            querySnapshot.forEach((document) => {
                const recordRef = doc(recordsRef, document.id);
                updateDoc(recordRef, {
                    journal: true
                });
            });
        } else {
            console.log('No records found for today');
        }
    });

    return journal;
};

export const sendSignalRequest = async (seekerId: string, helperId: string, helperUsername: string) => {
    const userRef = doc(usersRef, seekerId);
    const signalsRef = collection(userRef, 'signals');

    const signal = await setDoc(doc(signalsRef, helperId), {
        id: helperId,
        time: Timestamp.now(),
        username: helperUsername
    });

    return signal;
};

export const updateSigalRequest = async (userId: string, signalName: string, signalId: string, type: 'add' | 'remove') => {
    try {
        const signalCollection = collection(usersRef, userId, 'signals');
        const signalReqRef = doc(signalCollection, signalId);
        const userRef = doc(usersRef, userId);

        const signalRef = doc(usersRef, signalId);
    
        if (type === 'add') {
            // update from seeker
            await deleteDoc(signalReqRef);
    
            await updateDoc(userRef, {
                signal: signalName,
                signalId: signalId,
            });

            // update from helper
            await updateDoc(signalRef, {
                seekers: arrayUnion(userId)
            });
        } else {
            await deleteDoc(signalReqRef);
        }
    } catch (error) {
        console.error(error);
    }
};

export const releaseSignal = async (userId: string, signalId: string) => {
    try {
        const userRef = doc(usersRef, userId);
        const signalRef = doc(usersRef, signalId);

        await updateDoc(userRef, {
            signal: '',
            signalId: '',
            prevSignals: arrayUnion(signalId)
        });

        await updateDoc(signalRef, {
            seekers: arrayRemove(userId)
        });
    } catch (error) {
        console.error(error);
    }
};

export const createRoom = async (roomId: string) => {
    await setDoc(doc(chatsRef, roomId), {
        roomId,
        createdAt: Timestamp.fromDate(new Date())
    });
};

export const sendMessage = async (roomId: string, userId: string, username: string, message: string, role: 'seeker' | 'helper' | 'bot') => {
    const docRef = doc(chatsRef, roomId);
    const messagesRef = collection(docRef, 'messages');

    const now = new Date();
    const time = Timestamp.fromDate(now);

    const messageDocRef = doc(messagesRef);
    await setDoc(messageDocRef, {
        userId,
        message,
        username,
        role,
        time
    });

    const messageId = messageDocRef.id;
    await updateDoc(messageDocRef, { id: messageId });
};

export const deletePrevSignal = async (userId: string, signalId: string) => {
    const userRef = doc(usersRef, userId);

    await updateDoc(userRef, {
        prevSignals: arrayRemove(signalId)
    });
};

export const createPost = async (userId: string, username: string, groupId: string, groupName: string, content: string) => {
    const now = new Date();
    const time = Timestamp.fromDate(now);

    const postDocRef = doc(postsRef);
    const post = await setDoc(postDocRef, {
        user: userId,
        username,
        time,
        groupId,
        groupName,
        content,
        likedBy: [],
        reportedBy: []
    });

    const postId = postDocRef.id;
    await updateDoc(postDocRef, { id: postId });

    return post;   
};

export const createGroup = async (userId: string, username: string, name: string, description: string, tags: Array<keyof Goals>) => {
    const q = query(groupsRef, where("name", "==", name));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        const groupDocRef = doc(groupsRef);
        const group = await setDoc(groupDocRef, {
            name,
            members: 1,
            owner: userId,
            ownerUsername: username,
            description,
            tags
        });

        const groupId = groupDocRef.id;
        await updateDoc(groupDocRef, { id: groupId });

        const member = await addMember({ id: groupId, name, members: 1, owner: userId, ownerUsername: username, description, tags }, userId, username);

        return { group, groupId, member };
    } else {
        return "Already exists";
    }
}

// util functions
export const getRoomId = (userId1: string, userId2: string) => {
    const sortedIds = [userId1, userId2].sort();
    const roomId = sortedIds.join('-');
    return roomId;
}
