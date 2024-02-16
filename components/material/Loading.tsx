import { ActivityIndicator } from 'react-native';

import { Colors } from '@types';
import { getColorFromClass } from '@constants';

import { Section } from '../styled';

interface LoadingProps {
    size?: number;
    color?: keyof Colors;
}

export const Loading = ({ size = 48, color = "black" }: LoadingProps) => {
    const colorValue = getColorFromClass(color);

    return (
        <Section stylize="flex-1 justify-center items-center">
            <ActivityIndicator size={size} color={colorValue} />
        </Section>
    );
}
