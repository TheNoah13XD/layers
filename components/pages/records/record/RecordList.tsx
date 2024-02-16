import { ScrollView } from "react-native";

import { Record } from "@types";
import { Section } from "@components/styled";
import { RecordCard } from "./RecordCard";

interface RecordListProps {
    records: Record[];
    activeRecordId: string;
    onRecordPress: (id: string) => void;
}

export const RecordList = ({ records, activeRecordId, onRecordPress }: RecordListProps) => {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Section stylize="flex-row items-center mt-10 mx-4">
                {records.map(record => (
                    <RecordCard 
                        key={record.id} 
                        record={record} 
                        isActive={record.id === activeRecordId} 
                        onPress={() => onRecordPress(record.id)} 
                    />
                ))}
            </Section>
        </ScrollView>
    );
}