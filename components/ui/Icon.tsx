import { MaterialIcons } from '@expo/vector-icons';

import { Colors, getColorFromClass } from '../../constants';

interface IconProps {
    name: keyof typeof MaterialIcons.glyphMap;
    color: keyof Colors;
    size?: number;
    className?: string;
}

const Icon = ({ name, size = 24, color, className }: IconProps) => {
    const colorValue = getColorFromClass(color);

    return (
        <MaterialIcons name={name} size={size} color={colorValue} className={className} />
    );
}

export default Icon;
