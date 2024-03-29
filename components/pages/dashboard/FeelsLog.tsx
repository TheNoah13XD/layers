import { Section, Type } from "@components/styled";
import { Button, Divider } from "@components/material";

export interface FeelsLogProps {
    feel: string;
    onPress: () => void;
    stylize?: string;
}

export const FeelsLog = ({ feel, onPress, stylize }: FeelsLogProps) => {
    const quote = "I'm feeling positive!";

    return (
        <Section stylize={`flex-row items-center ${stylize}`}>
            <Section stylize='justify-center items-center rounded-[50px] bg-primaryFixed w-[220px] h-[220px]'>
                <Type stylize='text-[91px] text-primary'>{feel}</Type>
            </Section>
            <Section stylize='flex-col pl-4'>
                <Type weight='medium' stylize='text-titleMedium text-onPrimaryContainer w-[120px]'>{quote}</Type>
                <Divider stylize="mt-3" />
                <Button type='filled' icon="add" containerColor='bg-primary' contentColor='text-onPrimary' stylize='mt-3' onPress={onPress}>Swing</Button>
            </Section>
        </Section>
    );
}
