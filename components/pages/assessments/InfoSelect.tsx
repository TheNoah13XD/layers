import { Section, Type } from "@components/styled";
import { Icon, Toggle } from "@components/material";

export interface InfoSelectProps {
    age: number;
    incrementAge: () => void;
    decrementAge: () => void;
    isEnabled: boolean;
    toggleSwitch: () => void;
    stylize?: string;
}

export const InfoSelect = ({ age, incrementAge, decrementAge, isEnabled, toggleSwitch, stylize }: InfoSelectProps) => {
    return (
        <Section stylize={`flex-col self-center justify-center items-center bg-primaryFixed rounded-[50px] w-[360px] h-[360px] ${stylize}`}>
            <Section stylize="flex-row justify-center items-center bg-primaryFixedDim rounded-full px-8 w-[308px] h-[120px]">
                <Icon name="remove" color="onPrimaryContainer" stylize="justify-center items-center bg-onPrimary rounded-full w-10 h-10 m-1" onPress={decrementAge} />
                <Section stylize="justify-center items-center bg-primary rounded-full w-[52px] h-8 ml-12">
                    <Type stylize="text-titleLarge text-onPrimary">{age}</Type>
                </Section>
                <Icon name="add" color="onPrimaryContainer" stylize="justify-center items-center bg-onPrimary rounded-full w-10 h-10 m-1 ml-12" onPress={incrementAge} />
            </Section>
            <Section stylize="flex-row justify-center items-center bg-primaryFixedDim rounded-full px-8 w-[308px] h-[120px] mt-5">
                <Icon name="boy" color="onPrimaryContainer" stylize="justify-center items-center bg-onPrimary rounded-full w-10 h-10 m-1" />
                <Section stylize="justify-center items-center bg-primary rounded-full w-[52px] h-8 ml-12">
                    <Toggle isEnabled={isEnabled} toggleSwitch={toggleSwitch} />
                </Section>
                <Icon name="girl" color="onPrimaryContainer" stylize="justify-center items-center bg-onPrimary rounded-full w-10 h-10 m-1 ml-12" />
            </Section>
        </Section>
    );
}
