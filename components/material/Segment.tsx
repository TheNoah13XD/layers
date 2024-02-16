import { TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Section, Type } from "../styled";
import { Icon } from "./Icon";

interface SegmentProps {
    title: string;
    enabled: boolean;
    icon?: keyof typeof MaterialIcons.glyphMap | keyof typeof MaterialCommunityIcons.glyphMap;
    family?: 'material' | 'materialCommunity';
    onPress?: () => void;
    stylize?: string;
}

export const Segment = ({ title, enabled, icon, family = "material", onPress, stylize }: SegmentProps) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Section stylize={`flex-row justify-start items-center ${enabled ? 'bg-secondaryContainer' : 'bg-surfaceContainerLow'} rounded-[8px] h-8 px-2 ${stylize}`}>
                {enabled && <Icon name='check' size={18} color='onSecondaryContainer' />}
                <Type weight='medium' stylize={`text-labelLarge ${enabled ? 'text-onSecondaryContainer' : 'text-onSurfaceVariant'} px-2`}>{title}</Type>
                {icon && <Icon family={family} name={icon} size={18} color="onSurfaceVariant" />}
            </Section>
        </TouchableOpacity>
    );
}
 