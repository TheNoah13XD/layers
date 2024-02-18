import { ActivityIndicator } from 'react-native';

import { Colors } from '@types';
import { getColorFromClass } from '@constants';

import { Section } from '../styled';

interface LoadingProps {
    size?: number;
    color?: keyof Colors;
    stylize?: string;
}

export const Loading = ({ size = 48, color = "black", stylize }: LoadingProps) => {
    const colorValue = getColorFromClass(color);

    return (
        <Section stylize={`flex-1 justify-center items-center ${stylize}`}>
            <ActivityIndicator size={size} color={colorValue} />
        </Section>
    );
}
