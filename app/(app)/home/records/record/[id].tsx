import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import { format } from "date-fns";

import { fetchNextRecords } from "utils/firebase";
import { Blurhash, GradientContainer } from "@constants";
import { useAuth } from "@context";
import { Record } from "@types";

import { Section, Type } from "@components/styled";
import { Back, Card, Icon, Loading } from "@components/material";
import { RecordList, ScoreDisplay } from "@components/pages/records/record";

const RecordPage = () => {
    const id = useLocalSearchParams();
    const { user } = useAuth();

    if (!user || !id) {
        return null;
    }

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [records, setRecords] = useState<Record[]>([]);
    const [data, setData] = useState<Record>({} as Record);

    const getRecords = async (): Promise<() => void> => {
        setIsLoading(true);
        const unsubscribe = await fetchNextRecords(user.id, id.id as string, (records) => {
            const sortedRecords = records
                .map(record => {
                    // @ts-ignore
                    const date = new Date(record.date.toDate().toISOString());
                    return {
                        ...record,
                        date: format(date, 'MM/dd/yy')
                    };
                })
                .sort((a, b) => b.date.localeCompare(a.date));
    
            setRecords(sortedRecords);
            setData(sortedRecords[0]);
            setIsLoading(false);
        });
    
        return unsubscribe;
    }

    const changeCurrentRecord = (id: string) => {
        const currentRecord = records.find(record => record.id === id);
        if (currentRecord) {
            setData(currentRecord);
        }
    }

    useEffect(() => {
        let unsubscribe: () => void;
        getRecords().then(unsub => {
            unsubscribe = unsub;
        });
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [id.id]);

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <Section stylize="bg-surface rounded-b-[50px] w-full h-[418px]">
                <Back color="primary" onPress={() => router.back()} />
                <Image
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        zIndex: -1
                    }}
                    source={GradientContainer}
                    placeholder={Blurhash}
                    contentFit="cover"
                />

                <ScoreDisplay score={data.score} />
                <RecordList records={records} activeRecordId={data.id} onRecordPress={changeCurrentRecord} />
            </Section>

            <Section stylize="mt-7 px-7">
                <Card>
                    <Section stylize="flex-row justify-between items-center p-2">
                        <Type stylize="text-headlineMedium text-primary tracking-tight">Journal</Type>
                        <Icon name="keyboard-arrow-right" color="primary" onPress={() => router.push(`/home/records/journal/${data.id}`)} />
                    </Section>

                    {data.journal ? (
                        <Section stylize="mt-6 px-2 pb-2">
                            <Type stylize="text-headlineSmall text-onSurface">Journal feature is coming soon.</Type>
                        </Section>
                    ) : (
                        <Section stylize="mt-6 px-2 pb-2">
                            <Type stylize="text-headlineSmall text-onSurface">No journal entry for this day.</Type>
                        </Section>
                    )}
                </Card>

                <Card stylize="mt-3">
                    <Section stylize="flex-row justify-between items-center p-2">
                        <Type stylize="text-headlineMedium text-primary tracking-tight">Feels</Type>
                        <Icon name="keyboard-arrow-right" color="primary" />
                    </Section>

                    {data.feels ? (
                        <Section stylize="mt-6 px-2 pb-2">
                            <Type stylize="text-headlineSmall text-onSurface">Feels feature is coming soon.</Type>
                        </Section>
                    ) : (
                        <Section stylize="mt-6 px-2 pb-2">
                            <Type stylize="text-headlineSmall text-onSurface">No feels entry for this day.</Type>
                        </Section>
                    )}
                </Card>
            </Section>
        </>
    );
}
 
export default RecordPage;
