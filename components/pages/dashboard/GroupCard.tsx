import { Section, Type } from "@components/styled";
import { Icon } from "@components/material";
import { Pressable } from "react-native";

export interface GroupCardProps {
    name: string;
    members: number;
    role?: string;
    onPress?: () => void;
    stylize?: string;
}

export const GroupCard = ({ name, members, role, onPress, stylize }: GroupCardProps) => {
    const seeker = role === 'seeker';

    return (
        <Pressable className={`flex-col ${seeker ? "bg-primaryFixedDim" : "bg-secondaryFixedDim"} rounded-[25px] w-[260px] h-[220px] p-4 ${stylize}`} onPress={onPress}>
            <Section stylize='flex-row items-center'>
                <Icon family={role === "helper" ? "materialCommunity" : "material"} name={role === "helper" ? 'account-outline' : 'diversity-1'} color='onPrimary' stylize={`flex justify-center items-center ${seeker ? "bg-primary" : "bg-secondary"} rounded-full w-10 h-10`} />
                <Type stylize={`text-headlineSmall ${seeker ? "text-primary" : "text-secondary"} tracking-tight ml-2`}>{members}</Type>
            </Section>
            <Section stylize='flex-row justify-between items-center w-full mt-[108px]'>
                <Type stylize={`text-headlineLarge tracking-tight ${seeker ? "text-onPrimaryContainer" : "text-onSecondaryContainer"}`}>{name}</Type>
                <Icon name='north-east' color={seeker ? "onPrimaryContainer" : "onSecondaryContainer"} size={32}></Icon>
            </Section>
        </Pressable>
    );
}
