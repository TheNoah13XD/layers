import { useEffect, useState } from "react";
import { FlatList, ScrollView } from "react-native";
import { format } from 'date-fns';

import { fetchRecords } from "utils/firebase";
import { useAuth } from "@context";
import { Record } from "@types";

import { Section, Type } from "@components/styled";
import { Loading, Segment } from "@components/material";
import { RecordDiv, RecordStats } from "@components/pages/records";

const IndexHistory = () => {
    const { user } = useAuth();
    if (!user) {
        return null;
    }

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<Record[]>([]);

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            const records = await fetchRecords(user.id);

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
    
            setData(sortedRecords);
            setIsLoading(false);
        }
    
        getData();
    }, []);

    if (isLoading) {
        return <Loading />
    }

    return (
        <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={(
                <>
                    <Section stylize="items-center mt-[68px]">
                        <RecordStats score={user.score!} type="index" />
                    </Section>

                    <Section stylize="pl-7 mt-7">
                        <Type stylize="text-headlineMedium text-onSurfaceVariant tracking-tight">Index History</Type>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <Section stylize="flex-row items-center mt-2">
                                <Type stylize="text-labelLarge text-onSurface">Filter</Type>

                                <Section stylize="flex-row ml-6">
                                    <Segment title='This Week' enabled={true} />
                                    <Segment title='Last Week' enabled={false} stylize='ml-1' />
                                    <Segment title='Custom' enabled={false} icon="date-range" stylize='ml-1' />
                                </Section>
                            </Section>
                        </ScrollView>
                    </Section>
                </>
            )}
            renderItem={({ item, index }) => (
                <RecordDiv 
                    score={item.score} 
                    date={item.date} 
                    day={item.day} 
                    stylize={`
                        ${index === 0 ? 'mt-7' : 'mt-2'}
                        ${index === data.length - 1 ? 'mb-24' : ''}
                    `}
                />
            )}
        />
    );
}
 
export default IndexHistory;
