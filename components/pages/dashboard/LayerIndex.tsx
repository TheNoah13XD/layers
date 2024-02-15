import { Section, Type } from "@components/styled";
import { Button, Divider } from "@components/material";
import { router } from "expo-router";

export interface LayerIndexProps {
    score: number;
    stylize?: string;
}

export const LayerIndex = ({ score, stylize }: LayerIndexProps) => {
    const quote = 
        score > 80 ? 'Embrace positive journey.'
        : score > 60 ? 'Positive progress made.'
        : score > 40 ? 'Steady progress needed.'
        : score > 20 ? 'Improvement underway.'
        : 'Critical help necessary.';

    return (
        <Section stylize={`flex-row items-center ${stylize}`}>
            <Section stylize='justify-center items-center rounded-[50px] bg-primaryFixed w-[220px] h-[220px]'>
                <Type stylize='text-[91px] text-primary tracking-tightest'>{score}</Type>
            </Section>
            <Section stylize='flex-col pl-4'>
                <Type weight='medium' stylize='text-titleMedium text-onPrimaryContainer w-[120px]'>{quote}</Type>
                <Divider stylize="mt-3" />
                <Button type='filled' icon="arrow-right-alt" containerColor='bg-primary' contentColor='text-onPrimary' stylize='mt-3' onPress={() => router.push('/home/records')}>History</Button>
            </Section>
        </Section>
    );
}
