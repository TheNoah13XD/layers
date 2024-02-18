import { Section, Type } from "@components/styled";

export interface IndexScoreProps {
    score: number;
}

export const IndexScore = ({ score }: IndexScoreProps) => {
    return (
        <>
            <Section stylize="p-2">
                <Section stylize="flex-row">
                    <Type stylize="text-headlineMedium text-onSurfaceVariant tracking-tight">Layer Index:</Type>
                    <Type stylize="text-headlineMedium text-primary tracking-tight pl-3">{score}</Type>
                </Section>

                <Section stylize="mt-6">
                    <Type stylize="text-titleMedium text-onSurface">The layer index summarizes your mental well-being from app activity, guiding improvement.</Type>
                </Section>
            </Section>
        </>
    );
}
