import { Section, Type } from "@components/styled";
import { Icon } from "@components/material";

interface ActivityCardProps {
    title: string;
    description: string;
    stylize?: string;
}

export const ActivityCard = ({ title, description, stylize }: ActivityCardProps) => {
    return (
        <Section stylize={`border border-outline rounded-[25px] w-full pb-5 ${stylize}`}>
            <Section stylize="flex-col">
                <Section stylize="bg-primaryContainer w-full rounded-[25px] h-[180px]" />
                <Section stylize="mt-4 px-5">
                    <Section stylize="flex-row justify-between items-center">
                        <Type stylize="text-headlineLarge text-onSurface tracking-tight">{title}</Type>
                        <Icon name="keyboard-arrow-right" color="primary" stylize="flex justify-center items-center bg-primaryContainer rounded-full w-10 h-10" />
                    </Section>
                    <Type stylize="text-titleMedium text-onSurface tracking-wide mt-4">{description}</Type>
                </Section>
            </Section>
        </Section>
    )
}