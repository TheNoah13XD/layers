import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import { BgColors, Colors } from '@types';

import { Icon } from './Icon';

interface FabProps {
    icon: keyof typeof MaterialIcons.glyphMap | keyof typeof MaterialCommunityIcons.glyphMap;
    family?: 'material' | 'materialCommunity' | 'loading';
    type: 'regular' | 'small' | 'large';
    containerColor: keyof BgColors;
    contentColor: keyof Colors;
    onPress?: () => void;
    stylize?: string;
}

export const Fab = ({ icon, family = 'material', type, containerColor, contentColor, onPress, stylize }: FabProps) => {
    const sizeClass = type === 'large' ? 'w-24 h-24' : type === 'small' ? 'w-10 h-10' : 'w-14 h-14';
    const iconSize = type === 'large' ? 36 : 24;

    return (
        <TouchableOpacity activeOpacity={0.7} className={`${sizeClass} flex justify-center items-center rounded-full ${containerColor} ${stylize}`} onPress={onPress}>
            <Icon family={family} name={icon} size={iconSize} color={contentColor} />
        </TouchableOpacity>
    );
}
