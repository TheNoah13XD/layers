import { useState } from 'react';
import { TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { FontWeight } from "../../constants";
import { Section } from "./Stylize";
import Icon from "./Icon";

interface TextFieldProps {
    placeholder?: string;
    icon?: keyof typeof MaterialIcons.glyphMap;
    secureTextEntry?: boolean;
    stylize?: string;
}

const TextField = ({ placeholder, icon, secureTextEntry, stylize }: TextFieldProps) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const iconElement = icon ? <Icon name={icon} size={24} color="onSurface" /> : null;

    return (
        <Section stylize={`flex-row items-center w-full h-14 ${isFocused ? "border-2 border-primary" : "border border-onSurface"} rounded-full pl-3 ${stylize}`}>
            {iconElement}
            <TextInput 
                style={{ fontFamily: FontWeight['regular'] }} 
                className="text-bodyLarge text-onSurface w-full h-14 pl-3"
                placeholderTextColor="#1C1B20" 
                secureTextEntry={secureTextEntry} 
                placeholder={isFocused ? "" : placeholder}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
        </Section>
    );
}
 
export default TextField;
