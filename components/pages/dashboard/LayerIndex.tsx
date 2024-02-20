import { Section, Type } from "@components/styled";
import { Button, Divider } from "@components/material";
import { router } from "expo-router";

export interface LayerIndexProps {
    role: 'seeker' | 'helper';
    score: number;
    stylize?: string;
}

export const LayerIndex = ({ role, score, stylize }: LayerIndexProps) => {
    const quote = 
        score > 80 ? 'Embrace positive journey.'
        : score > 60 ? 'Positive progress made.'
        : score > 40 ? 'Steady progress needed.'
        : score > 20 ? 'Improvement underway.'
        : 'Critical help necessary.';

    const seeker = role === 'seeker';

    return (
        <Section stylize={`flex-row items-center ${stylize}`}>
            <Section stylize={`justify-center items-center rounded-[50px] ${seeker ? 'bg-primaryFixed' : "bg-secondaryFixed"} w-[220px] h-[220px]`}>
                <Type stylize={`text-[91px] ${seeker ? "text-primary" : "text-secondary"} tracking-tightest`}>{score}</Type>
            </Section>
            <Section stylize='flex-col pl-4'>
                <Type weight='medium' stylize={`text-titleMedium ${seeker ? "text-onPrimaryContainer" : "text-onSecondaryContainer"} w-[120px]`}>{seeker ? quote : "Score based on your helping status & mental health."}</Type>
                <Divider stylize="mt-3" />
                {seeker && <Button type='filled' icon="arrow-right-alt" containerColor={seeker ? 'bg-primary' : 'bg-secondary'} contentColor={seeker ? 'text-onPrimary' : 'text-onSecondary'} stylize='mt-3' onPress={() => router.push('/home/records')}>History</Button>}
            </Section>
        </Section>
    );
}
