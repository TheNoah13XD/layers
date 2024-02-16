import { useEffect, useState } from "react";
import { FlatList, ScrollView } from "react-native";
import { router } from "expo-router";
import { endOfWeek, format, isWithinInterval, parse, startOfWeek, subWeeks } from 'date-fns';

import { fetchRecords } from "utils/firebase";
import { useAuth } from "@context";
import { Record } from "@types";

import { Section, Type } from "@components/styled";
import { Loading, Segment } from "@components/material";
import { DatePickerDialog, RecordDiv, RecordStats } from "@components/pages/records";

const IndexHistory = () => {
    const { user } = useAuth();
    if (!user) {
        return null;
    }

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedSegment, setSelectedSegment] = useState<string>('This Week');
    const [data, setData] = useState<Record[]>([]);
    const [customData, setCustomData] = useState<Record[]>([]);
    const [filteredData, setFilteredData] = useState<Record[]>([]);

    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const getCurrentRecords = async () => {
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

    const getCustomRecords = async () => {
        setOpenDialog(false);
        setIsLoading(true);
        if (startDate && endDate) {
            const records = await fetchRecords(user.id, startDate, endDate);
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

            setCustomData(sortedRecords);
            setSelectedSegment('Custom');
        }
        setIsLoading(false);
    };

    useEffect(() => {
        getCurrentRecords();
    }, []);

    useEffect(() => {
        const sourceData = selectedSegment === 'Custom' ? customData : data;
        const filtered = sourceData.filter(record => {
            const recordDate = parse(record.date, 'MM/dd/yy', new Date());
            if (selectedSegment === 'This Week') {
                const start = startOfWeek(new Date());
                const end = endOfWeek(new Date());
                return isWithinInterval(recordDate, { start, end });
            } else if (selectedSegment === 'Last Week') {
                const start = startOfWeek(subWeeks(new Date(), 1));
                const end = endOfWeek(subWeeks(new Date(), 1));
                return isWithinInterval(recordDate, { start, end });
            }
            return true;
        });

        setFilteredData(filtered);
    }, [data, customData, selectedSegment]);

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <FlatList
                data={filteredData}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={(
                    <>
                        <Section stylize="items-center mt-[68px]">
                            <RecordStats score={user.score!} type="index" />
                        </Section>

                        <Section stylize="px-7 mt-7">
                            <Type stylize="text-headlineMedium text-onSurfaceVariant tracking-tight">Index History</Type>

                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                <Section stylize="flex-row items-center mt-2">
                                    <Type stylize="text-labelLarge text-onSurface">Filter</Type>

                                    <Section stylize="flex-row ml-6">
                                        <Segment 
                                            title='This Week' 
                                            enabled={selectedSegment === 'This Week'} 
                                            onPress={() => setSelectedSegment('This Week')}
                                        />
                                        <Segment 
                                            title='Last Week' 
                                            enabled={selectedSegment === 'Last Week'} 
                                            onPress={() => setSelectedSegment('Last Week')}
                                            stylize='ml-1' 
                                        />
                                        <Segment 
                                            title='Custom' 
                                            enabled={selectedSegment === 'Custom'}
                                            icon="date-range" 
                                            onPress={() => setOpenDialog(true)}
                                            stylize='ml-1' 
                                        />
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
                            ${index === filteredData.length - 1 ? 'mb-24' : ''}
                        `}
                        onPress={() => {
                            router.push(`/home/records/record/${item.id}`)
                        }}
                    />
                )}
            />

            <DatePickerDialog
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                getCustomRecords={getCustomRecords}
            />
        </>
    );
}
 
export default IndexHistory;
