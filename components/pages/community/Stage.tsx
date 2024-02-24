import { TouchableOpacity } from "react-native";

import { Section, Type } from "@components/styled";
import { Icon } from "@components/material";

export interface StageProps {
    name: string;
    description: string;
    onPress?: () => void;
    stylize?: string;
}

export const Stage = ({ name, description, onPress, stylize }: StageProps) => {
    return (
        <Section stylize={`flex-col justify-between bg-primaryContainer overflow-hidden rounded-[25px] w-[180px] h-[160px] ${stylize}`}>
            <Section stylize='pl-3 pt-4'>
                <Type stylize='text-headlineSmall tracking-tight text-black'>{name}</Type>
                <Type stylize='text-bodySmall tracking-wide w-20 pt-2 text-black'>{description}</Type>
            </Section>

            <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
                <Section stylize='flex-row justify-center items-center bg-primaryFixedDim rounded-[18px] w-full py-[10px]'>
                    <Icon family='materialCommunity' name='microphone-outline' color='black' size={16} />
                    <Type stylize='text-bodySmall tracking-wide pl-2 uppercase'>Join Voice</Type>
                </Section>
            </TouchableOpacity>
        </Section>
    );
}
