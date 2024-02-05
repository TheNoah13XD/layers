import { Pressable } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import { BgColors, Colors } from '../../constants';
import Icon from './Icon';

interface FabProps {
    icon: keyof typeof MaterialIcons.glyphMap | keyof typeof MaterialCommunityIcons.glyphMap;
    type: 'regular' | 'small' | 'large';
    containerColor: keyof BgColors;
    contentColor: keyof Colors;
    onPress?: () => void;
    stylize?: string;
}

const Fab = ({ icon, type, containerColor, contentColor, onPress, stylize }: FabProps) => {
    const sizeClass = type === 'large' ? 'w-24 h-24' : type === 'small' ? 'w-10 h-10' : 'w-14 h-14';
    const iconSize = type === 'large' ? 36 : 24;

    return (
        <Pressable className={`${sizeClass} rounded-full justify-center items-center ${containerColor} ${stylize}`} onPress={onPress}>
            <Icon name={icon} size={iconSize} color={contentColor} />
        </Pressable>
    );
};

export default Fab;
