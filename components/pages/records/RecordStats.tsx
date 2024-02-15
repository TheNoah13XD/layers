import { Image } from "expo-image";

import { Blurhash, GradientContainer } from '@constants';

import { Section, Type } from "@components/styled";
import { Icon } from "@components/material";

export interface RecordStatsProps {
    score: number;
    type: 'index' | 'journal';
}

export const RecordStats = ({ score, type }: RecordStatsProps) => {
    const analysis = 
        score > 80 ? 'Mentally stable!'
        : score > 60 ? 'Mentally healthy!'
        : score > 40 ? 'Mentally unhealthy!'
        : score > 20 ? 'Mentally unstable!'
        : 'Critical condition!';

    const getEmoji = (score: number, type: string) => {
        if (type === 'index') {
            if (score > 80) return 'sentiment-very-satisfied';
            if (score > 60) return 'sentiment-satisfied';
            if (score > 40) return 'sentiment-neutral';
            if (score > 20) return 'sentiment-dissatisfied';
            return 'sentiment-very-dissatisfied';
        } else if (type === 'journal') {
            if (score > 23) return 'sentiment-very-satisfied';
            if (score > 18) return 'sentiment-satisfied';
            if (score > 13) return 'sentiment-neutral';
            if (score > 8) return 'sentiment-dissatisfied';
            return 'sentiment-very-dissatisfied';
        }
        return 'sentiment-very-dissatisfied';
    };

    const emoji = getEmoji(score, type);

    const description = type === 'index' ? analysis : 'Journals this month!';

    return (
        <Section stylize="flex justify-center items-center w-[375px] h-[350px]">
            <Image
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    zIndex: -1
                }}
                source={GradientContainer}
                placeholder={Blurhash}
                contentFit="cover"
            />

            <Icon name={emoji} color="onSurfaceVariant" size={36} stylize="absolute left-5 top-8" />

            <Section stylize="flex-col items-center">
                <Type stylize="text-displayLarge text-black tracking-tightest">{score}</Type>
                <Type stylize="text-headlineMedium text-onSurface tracking-tight">{description}</Type>
            </Section>
        </Section>
    );
}
