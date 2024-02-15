import { Section, Type } from "@components/styled";
import { Button, Divider } from "@components/material";

export interface LayerIndexProps {
    score: number;
    quote: string;
    stylize?: string;
}

export const LayerIndex = ({ score, quote, stylize }: LayerIndexProps) => {
    return (
        <Section stylize={`flex-row items-center ${stylize}`}>
            <Section stylize='justify-center items-center rounded-[50px] bg-primaryFixed w-[220px] h-[220px]'>
                <Type stylize='text-[91px] text-primary'>{score}</Type>
            </Section>
            <Section stylize='flex-col pl-4'>
                <Type weight='medium' stylize='text-titleMedium text-onPrimaryContainer w-[120px]'>{quote}</Type>
                <Divider stylize="mt-3" />
                <Button type='filled' icon="arrow-right-alt" containerColor='bg-primary' contentColor='text-onPrimary' stylize='mt-3'>History</Button>
            </Section>
        </Section>
    );
}
