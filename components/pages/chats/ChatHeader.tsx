import { router } from "expo-router";

import { Colors } from "@types";

import { Section, Type } from "@components/styled";
import { Back } from "@components/material";

interface ChatHeaderProps {
    title: string;
    color?: keyof Colors;
}

export const ChatHeader = ({ title, color = "secondary" }: ChatHeaderProps) => {
    return (
        <Section stylize="bg-[#F5FAFF] rounded-[18px] border border-outline w-full h-[140px]">
            <Back color={color} onPress={() => router.push('/chats')} />

            <Section stylize="flex-row mt-[84px] ml-16">
                {/* <Icon family='materialCommunity' name='account-outline' color='primary' size={28} /> */}
                <Type stylize="text-headlineSmall text-onSecondaryContainer tracking-tight">{title}</Type>
            </Section>
        </Section>
    );
}