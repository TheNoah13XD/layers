import { Pressable } from 'react-native';

import { BgColors, Colors } from '../../constants';
import Icon from './Icon';

interface FabProps {
    type: 'regular' | 'small' | 'large';
    containerColor: keyof BgColors;
    contentColor: keyof Colors;
    onPress?: () => void;
    stylize?: string;
}

const Fab = ({ type, containerColor, contentColor, onPress, stylize }: FabProps) => {
    const sizeClass = type === 'large' ? 'w-24 h-24' : type === 'small' ? 'w-10 h-10' : 'w-14 h-14';
    const iconSize = type === 'large' ? 36 : 24;

    return (
        <Pressable className={`${sizeClass} rounded-full justify-center items-center ${containerColor} ${stylize}`} onPress={onPress}>
            <Icon name="arrow-right-alt" size={iconSize} color={contentColor} />
        </Pressable>
    );
};

export default Fab;
