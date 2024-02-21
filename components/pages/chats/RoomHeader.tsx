import { router } from "expo-router";

import { Colors } from "@types";

import { Section, Type } from "@components/styled";
import { Back, Icon } from "@components/material";

interface RoomHeaderProps {
    title: string;
    role: 'helper' | 'seeker';
    color?: keyof Colors;
}

export const RoomHeader = ({ title, role, color = "secondary" }: RoomHeaderProps) => {
    const seeker = role === 'seeker';

    return (
        <Section stylize={`fixed top-0 ${seeker ? 'bg-[#F5FAFF]' : 'bg-[#F4EEFF]'} rounded-[18px] border border-outline w-full h-[140px] z-50`}>
            <Back color={color} onPress={() => router.push('/chats')} />

            <Section stylize="flex-row items-center mt-20 ml-16">
                <Icon family='materialCommunity' name='account-outline' color={seeker ? "onSecondaryContainer" : "onPrimaryContainer"} size={28} stylize={`flex justify-center items-center ${seeker ? "bg-secondaryContainer" : "bg-primaryContainer"} rounded-full w-10 h-10`}/>
                <Type stylize={`text-headlineSmall ${seeker ? "text-onSecondaryContainer" : "text-onPrimaryContainer"} tracking-tight ml-2`}>{title}</Type>
            </Section>
        </Section>
    );
}