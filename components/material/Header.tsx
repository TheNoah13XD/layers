import { router } from "expo-router";

import { Section, Type } from "../styled";
import { Back } from "./Back";

interface HeaderProps {
    title: string;
    headerRight?: React.ReactNode;
    color?: 'primary' | 'secondary' | 'tertiary';
}

export const Header = ({ title, headerRight, color = "primary" }: HeaderProps) => {
    const bgColor = color === "primary" ? "bg-[#F4EEFF]" : color === "secondary" ? "bg-[#F5FAFF]" : "bg-[#FFF8F6]";
    const textColor = color === "primary" ? "text-primary" : color === "secondary" ? "text-secondary" : "text-tertiary";

    return (
        <>
            <Section stylize={`${bgColor} border-b-[#79757F] border-b border-x rounded-b-[18px] w-full h-[140px]`}>
                <Back onPress={() => router.back()} color={color} />
                <Type stylize={`absolute top-[84px] left-[72px] text-headlineSmall ${textColor}`}>{title}</Type>
                {headerRight}
            </Section>
        </>
    );
}
