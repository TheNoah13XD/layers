import { collection, doc, getDocs, query, where, orderBy, getDoc, limit, startAt } from "firebase/firestore";
import { usersRef } from "@firebase";
import { startOfDay, subWeeks } from 'date-fns';

import { Record } from "@types";

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
