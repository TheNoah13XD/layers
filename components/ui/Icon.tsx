import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Colors, getColorFromClass } from '../../constants';
import { Section } from './Stylize';

interface IconProps {
    name: keyof typeof MaterialIcons.glyphMap | keyof typeof MaterialCommunityIcons.glyphMap;
    family?: 'material' | 'materialCommunity';
    color: keyof Colors;
    size?: number;
    stylize?: string;
}

const Icon = ({ name, family = 'material', size = 24, color, stylize }: IconProps) => {
    const colorValue = getColorFromClass(color);

    return (
        <Section stylize={stylize}>
            { family === 'material' ? 
                <MaterialIcons name={name as keyof typeof MaterialIcons.glyphMap} size={size} color={colorValue} /> : 
                <MaterialCommunityIcons name={name as keyof typeof MaterialCommunityIcons.glyphMap} size={size} color={colorValue} />
            }
        </Section>
    );
}

export default Icon;
