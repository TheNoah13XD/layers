import { Section, Type } from "@components/styled";

interface ScoreDisplayProps {
    score: number;
}

export const ScoreDisplay = ({ score }: ScoreDisplayProps) => {
    const analysis =
        score > 80 ? 'Mentally stable!'
        : score > 60 ? 'Mentally healthy!'
        : score > 40 ? 'Mentally unhealthy!'
        : score > 20 ? 'Mentally unstable!'
        : 'Critical condition!';

    return (
        <Section stylize="flex-col justify-center items-center mt-28">
            <Type stylize="text-displayLarge text-black tracking-tightest">{score}</Type>
            <Type stylize="text-headlineMedium text-onSurface tracking-tight">{analysis}</Type>
        </Section>
    );
}
