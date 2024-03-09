import { router } from "expo-router";

import { Colors } from "@types";

import { Section, Type } from "@components/styled";
import { Back, Icon } from "@components/material";

interface RoomHeaderProps {
    title: string;
    type: 'signal' | 'archived';
    role: 'helper' | 'seeker';
    color?: keyof Colors;
    handleRelease?: () => void;
    setEmergency?: () => void;
}

export const RoomHeader = ({ title, type, role, color = "secondary", handleRelease, setEmergency }: RoomHeaderProps) => {
    const seeker = role === 'seeker';

    return (
        <Section stylize={`absolute top-0 ${seeker ? 'bg-[#F5FAFF]' : 'bg-[#F4EEFF]'} rounded-[18px] border border-outline w-full h-[140px] z-30`}>
            <Back color={color} onPress={() => router.back()} />

            <Section stylize="flex-row items-center mt-20 ml-16">
                <Icon family='materialCommunity' name='account-outline' color={seeker ? "onSecondaryContainer" : "onPrimaryContainer"} size={28} stylize={`flex justify-center items-center ${seeker ? "bg-secondaryContainer" : "bg-primaryContainer"} rounded-full w-10 h-10`}/>
                <Type stylize={`text-headlineSmall ${seeker ? "text-onSecondaryContainer" : "text-onPrimaryContainer"} tracking-tight ml-2`}>{title}</Type>
            </Section>

            {type === 'signal' && (
                <>
                    <Icon name="swap-calls" color="like" size={28} stylize="absolute top-[86px] right-16" onPress={handleRelease} />
                    <Icon name="new-releases" color="like" size={28} stylize="absolute top-[86px] right-6" onPress={setEmergency} />
                </>
            )}
        </Section>
    );
}
