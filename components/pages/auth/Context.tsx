import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from "expo-image";

import { Blurhash, GradientContainer } from '@constants';

import { Section, Type } from "@components/styled";
import { Icon } from "@components/material";

export interface ContextProps {
    title: string;
    description: string;
    icon: keyof typeof MaterialIcons.glyphMap | keyof typeof MaterialCommunityIcons.glyphMap;
    iconFamily?: 'material' | 'materialCommunity';
}

export const Context = ({ title, description, icon, iconFamily = 'material' }: ContextProps) => {
    return (
        <>
            <Section stylize='pl-5 py-10 rounded-[50px]'>
                <Image
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        zIndex: -1
                    }}
                    source={GradientContainer}
                    placeholder={Blurhash}
                    contentFit="cover"
                />
                <Icon family={iconFamily} name={icon} size={57} color='black' />

                <Section stylize='pl-2 pt-[132px]'>
                    <Type stylize='text-displayMedium tracking-tightest text-black'>{title}</Type>
                    <Type stylize='text-titleSmall text-onSurface pt-2'>{description}</Type>
                </Section>
            </Section>
        </>
    );
}
