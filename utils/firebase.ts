import { collection, doc, getDocs } from "firebase/firestore";
import { usersRef } from "@firebase";
import { Record } from "@types";

export const fetchRecords = async (userId: string) => {
    const userDoc = doc(usersRef, userId);
    const recordsRef = collection(userDoc, 'records');

    const querySnapshot = await getDocs(recordsRef);
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
