import { collection, doc, getDocs, query, where, orderBy } from "firebase/firestore";
import { usersRef } from "@firebase";
import { subWeeks, startOfDay } from 'date-fns';

import { Record } from "@types";

export const fetchRecords = async (userId: string) => {
    const userDoc = doc(usersRef, userId);
    const recordsRef = collection(userDoc, 'records');

    const twoWeeksAgo = startOfDay(subWeeks(new Date(), 2));

    const q = query(recordsRef, where('date', '>=', twoWeeksAgo), orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);

    const records: Record[] = [];
    querySnapshot.forEach((doc) => {
        const data = doc.data();

        records.push({
            date: data.date,
            day: data.day,
            feels: data.feels,
            journal: data.journal,
            score: data.score
        });
    });

    return records;
};
