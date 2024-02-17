import { useMemo } from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { BgColors, TextColors, BorderColors, Colors } from "@types";

import { Section, Type } from "../styled";
import { Icon } from "./Icon";

export interface ButtonProps {
    type: 'elevated' | 'filled' | 'outlined' | 'text';
    containerColor?: keyof BgColors;
    contentColor: keyof TextColors;
    borderColor?: keyof BorderColors;
    icon?: keyof typeof MaterialIcons.glyphMap;
    onPress?: () => void;
    stylize?: string;
    children: React.ReactNode;
}

export const Button = ({ type, containerColor, contentColor, borderColor, icon, onPress, stylize, children }: ButtonProps) => {
    const iconColor = contentColor.replace('text-', '') as keyof Colors;

    const iconElement = useMemo(() => {
        return icon ? <Icon name={icon} size={24} color={iconColor} /> : null;
    }, [icon, iconColor]);

    const buttonStyle = useMemo(() => {
        const styles = {
            'filled': containerColor,
            'elevated': `${containerColor} shadow shadow-[0_1px_2px_0px_rgba(0,0,0,0.3)]  shadow-[0_1px_3px_1px_rgba(0,0,0,0.15)]`,
            'outlined': `border ${borderColor} bg-none`,
            'text': 'bg-none'
        };
        return styles[type] || '';
    }, [type, containerColor, borderColor]);

    return (
        <Section stylize={stylize}>
            <TouchableOpacity activeOpacity={0.9} className={`flex flex-row items-center justify-center h-10 px-4 outline-none rounded-[20px] ${buttonStyle}`} onPress={onPress}>
                {iconElement}
                <Type weight="medium" stylize={`text-labelLarge ${contentColor} px-2`}>{children}</Type>
            </TouchableOpacity>
        </Section>
    );
}
