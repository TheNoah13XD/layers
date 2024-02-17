import { TextInput } from "react-native";

import { FontWeight } from "@constants";

import { Section } from "@components/styled";
import { Icon } from "@components/material";

interface SearchBarProps {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchBar = ({ search, setSearch }: SearchBarProps) => {
    return (
        <Section stylize={`flex-row justify-between items-center w-full h-[70px] border border-outline bg-[#F5FAFF] rounded-full px-6 overflow-hidden mt-6`}>
            <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder={"Search for groups"}
                placeholderTextColor="#48454E" 
                keyboardType="default"
                style={{ fontFamily: FontWeight['regular'] }} 
                className="text-bodyLarge text-onSurface tracking-wider w-full h-[70px] pl-3"
            />
            <Icon name="search" size={24} color="onSurfaceVariant" stylize="absolute right-6" />
        </Section>
    );
}
