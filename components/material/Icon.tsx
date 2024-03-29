import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Colors } from '@types';
import { getColorFromClass } from '@constants';

import { Section } from "../styled";
import { ActivityIndicator } from 'react-native';

interface IconProps {
    name: keyof typeof MaterialIcons.glyphMap | keyof typeof MaterialCommunityIcons.glyphMap;
    family?: 'material' | 'materialCommunity' | 'loading';
    color: keyof Colors;
    size?: number;
    onPress?: () => void;
    stylize?: string;
}

export const Icon = ({ name, family = 'material', size = 24, color, onPress, stylize }: IconProps) => {
    const colorValue = getColorFromClass(color);

    return (
        <Section stylize={stylize}>
            { family === 'material' ? 
                <MaterialIcons name={name as keyof typeof MaterialIcons.glyphMap} size={size} color={colorValue} onPress={onPress} />
                : family === 'materialCommunity' ? <MaterialCommunityIcons name={name as keyof typeof MaterialCommunityIcons.glyphMap} size={size} color={colorValue} onPress={onPress} />
                : <ActivityIndicator size={size} color={colorValue} />                
            }
        </Section>
    );
}
