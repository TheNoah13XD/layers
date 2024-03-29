import { useState } from 'react';
import { TextInput, TextInputProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { FontWeight } from '@constants';

import { Section } from "../styled";
import { Icon } from './Icon';

interface TextFieldProps {
    value: any;
    onChangeText: (text: string) => void;
    maxLength?: number;
    placeholder?: string;
    icon?: keyof typeof MaterialIcons.glyphMap;
    keyboardType?: "email-address" | "numeric" | "phone-pad" | "default";
    secureTextEntry?: boolean;
    stylize?: string;
    rest?: TextInputProps;
}

export const TextField = ({ value, onChangeText, maxLength = 120, placeholder, icon, keyboardType, secureTextEntry, stylize, rest }: TextFieldProps) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const iconElement = icon ? <Icon name={icon} size={24} color="onSurface" /> : null;

    return (
        <Section stylize={`flex-row items-center w-full h-14 ${isFocused ? "border-2 border-primary" : "border border-onSurface"} rounded-full pl-3 overflow-hidden ${stylize}`}>
            {iconElement}
            <TextInput
                value={value as string}
                onChangeText={onChangeText} 
                maxLength={maxLength}
                placeholder={isFocused ? "" : placeholder}
                placeholderTextColor="#48454E" 
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{ fontFamily: FontWeight['regular'] }} 
                className="text-bodyLarge text-onSurface w-full h-14 pl-3"
                {...rest}
            />
        </Section>
    );
}
