import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Section, Type } from "../styled";
import { Button } from "./Button";
import { Divider } from "./Divider";
import { Icon } from "./Icon";

export interface DialogProps {
    title: string;
    icon?: keyof typeof MaterialIcons.glyphMap | keyof typeof MaterialCommunityIcons.glyphMap;
    divider?: boolean;
    family?: 'material' | 'materialCommunity' | 'loading';
    cancelText?: string;
    confirmText?: string;
    onCancel: () => void;
    onConfirm: () => void;
    children: React.ReactNode;
    stylize?: string;
}

export const Dialog = ({ title, icon, divider = true, family = "material", cancelText = "Cancel", confirmText = "Done", onConfirm, onCancel, children, stylize }: DialogProps) => {
    return (
        <>
            <Section stylize="absolute bg-black w-full h-screen opacity-40 z-50" />

            <Section stylize={`absolute justify-center items-center w-full h-full z-10 ${stylize}`}>
                <Section stylize="bg-surface border border-outline rounded-[28px] py-6">
                    <Section stylize="flex-row justify-between items-center px-6">
                        <Type stylize="text-headlineLarge text-onSurface tracking-tight">{title}</Type>
                        {icon && <Icon family={family} name={icon} size={32} color="onSurfaceVariant" />}
                    </Section>

                    {divider && <Divider stylize="mt-2" />}

                    <Section stylize="flex-row justify-between items-center mt-6 px-6">
                        {children}
                    </Section>

                    <Section stylize="flex-row items-center self-end mt-6 px-6">
                        {cancelText && <Button type="text" contentColor="text-primary" onPress={onCancel}>{cancelText}</Button>}
                        <Button type="text" contentColor="text-primary" onPress={onConfirm}>{confirmText}</Button>
                    </Section>
                </Section>
            </Section>
        </>
    );
}
