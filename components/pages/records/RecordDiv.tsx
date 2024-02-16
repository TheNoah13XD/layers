import { TouchableOpacity } from "react-native";

import { Section, Type } from "@components/styled";
import { Icon } from "@components/material";

export interface RecordDivProps {
    score: number;
    date: string;
    day: string;
    onPress?: () => void;
    stylize?: string;
}

export const RecordDiv = ({ score, date, day, onPress, stylize }: RecordDivProps) => {
    return (
        <Section stylize="px-7">
            <Section stylize={`flex-row justify-between items-center border border-outline rounded-full h-[72px] w-full ${stylize}`}>
                <Section stylize="flex-row items-center">
                    <Section stylize="flex justify-center items-center bg-primaryContainer rounded-full w-[60px] h-[60px] ml-[6px]">
                        <Type stylize="text-onPrimaryContainer text-headlineMedium tracking-tighter">{score}</Type>
                    </Section>

                    <Section stylize="ml-4">
                        <Type stylize="text-titleLarge text-onSurface">{date}</Type>
                        <Type stylize="text-titleMedium text-onSurfaceVariant">{day}</Type>
                    </Section>
                </Section>

                <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
                    <Icon name="keyboard-arrow-right" color="primary" stylize="bg-primaryContainer rounded-full p-2 mr-4" />
                </TouchableOpacity>
            </Section>
        </Section>
    );
}
