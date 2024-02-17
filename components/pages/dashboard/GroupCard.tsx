import { Section, Type } from "@components/styled";
import { Icon } from "@components/material";

export interface GroupCardProps {
    name: string;
    members: number;
    stylize?: string;
}

export const GroupCard = ({ name, members, stylize }: GroupCardProps) => {
    return (
        <Section stylize={`flex-col bg-primaryFixedDim rounded-[25px] w-[260px] h-[220px] p-4 ${stylize}`}>
            <Section stylize='flex-row items-center'>
                <Icon name='diversity-1' color='onPrimary' stylize='flex justify-center items-center bg-primary rounded-full w-10 h-10' />
                <Type stylize='text-headlineSmall text-primary tracking-tight ml-2'>{members}</Type>
            </Section>
            <Section stylize='flex-row justify-between items-center w-full mt-[108px]'>
                <Type stylize='text-headlineLarge tracking-tight text-onPrimaryContainer'>{name}</Type>
                <Icon name='north-east' color='onPrimaryContainer' size={32}></Icon>
            </Section>
        </Section>
    );
}
