import { useState } from "react";
import { TouchableOpacity } from "react-native";

import { Section, Type } from "../styled";
import { Icon } from "./Icon";

interface SegmentProps {
    title: string;
    enabled: boolean;
    stylize?: string;
}

export const Segment = ({ title, enabled, stylize }: SegmentProps) => {
    const [selected, setSelected] = useState(enabled);

    const switchSegment = () => {
        setSelected(!selected);
    }

    return (
        <TouchableOpacity onPress={switchSegment}>
            <Section stylize={`flex-row justify-start items-center ${selected ? 'bg-secondaryContainer' : 'bg-surfaceContainerLow'} rounded-[8px] h-8 px-2 ${stylize}`}>
                {selected && <Icon name='check' size={18} color='onSecondaryContainer' />}
                <Type weight='medium' stylize={`text-labelLarge ${selected ? 'text-onSecondaryContainer' : 'text-onSurfaceVariant'} px-2`}>{title}</Type>
            </Section>
        </TouchableOpacity>
    );
}
 