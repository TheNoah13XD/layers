import { useMemo } from "react";
import { Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { BgColors, TextColors, BorderColors, Colors } from "@types";

import { Section, Type } from "../styled";
import { Icon } from "./Icon";

interface ButtonProps {
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
    const iconElement = icon ? <Icon name={icon} size={24} color={iconColor} /> : null;

    const buttonStyle = useMemo(() => {
        let style = '';
        if (type === 'filled') {
            style += containerColor;
        }
        if (type === 'elevated') {
            style += `${containerColor} shadow shadow-[0_1px_2px_0px_rgba(0,0,0,0.3)]  shadow-[0_1px_3px_1px_rgba(0,0,0,0.15)]`;
        }
        if (type === 'outlined') {
            style += `border ${borderColor} bg-none`;
        }
        if (type === 'text') {
            style += 'bg-none';
        }
        return style;
    }, [type, containerColor, contentColor]);

    return (
        <Section stylize={stylize}>
            <Pressable className={`flex flex-row items-center justify-center h-10 px-4 outline-none rounded-[20px] ${buttonStyle}`} onPress={onPress}>
                {iconElement}
                <Type weight="medium" stylize={`text-labelLarge ${contentColor} px-2`}>{children}</Type>
            </Pressable>
        </Section>
    );
}
