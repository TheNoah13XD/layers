import { useState } from "react";
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
    stylize?: string;
}

export const Segment = ({ title, enabled, icon, family = "material", stylize }: SegmentProps) => {
    const [selected, setSelected] = useState(enabled);

    const switchSegment = () => {
        setSelected(!selected);
    }

    return (
        <TouchableOpacity onPress={switchSegment}>
            <Section stylize={`flex-row justify-start items-center ${selected ? 'bg-secondaryContainer' : 'bg-surfaceContainerLow'} rounded-[8px] h-8 px-2 ${stylize}`}>
                {selected && <Icon name='check' size={18} color='onSecondaryContainer' />}
                <Type weight='medium' stylize={`text-labelLarge ${selected ? 'text-onSecondaryContainer' : 'text-onSurfaceVariant'} px-2`}>{title}</Type>
                {icon && <Icon family={family} name={icon} size={18} color="onSurfaceVariant" />}
            </Section>
        </TouchableOpacity>
    );
}
 