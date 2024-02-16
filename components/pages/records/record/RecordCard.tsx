import { TouchableOpacity } from "react-native";

import { Record } from "@types";
import { Section, Type } from "@components/styled";

interface RecordCardProps {
    record: Record;
    isActive: boolean;
    onPress: () => void;
}

export const RecordCard = ({ record, isActive, onPress }: RecordCardProps) => {
    return (
        <TouchableOpacity
            key={record.id} 
            activeOpacity={0.7} 
            className={`flex justify-center items-center ${isActive ? 'bg-secondary' : 'border border-onSecondaryContainer'} rounded-[50px] w-[75px] h-[125px] ml-2`} 
            onPress={onPress}
        >
            <Type stylize={`text-headlineMedium ${isActive ? 'text-onSecondary' : 'text-onSecondaryContainer'}`}>{record.score}</Type>
            <Type weight="medium" stylize={`text-titleSmall ${isActive ? 'text-onSecondary' : 'text-onSecondaryContainer'}`}>{record.date}</Type>
            {isActive && <Section stylize="absolute bottom-2 bg-secondaryContainer rounded-full w-2 h-2" />}
        </TouchableOpacity>
    );
}