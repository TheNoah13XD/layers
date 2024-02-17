import { useLocalSearchParams } from "expo-router";

import { Section, Type } from "@components/styled";

const Group = () => {
    const id = useLocalSearchParams();

    return (
        <Section stylize="flex-1 justify-center items-center">
            <Type>{id.id}</Type>
        </Section>
    );
}
 
export default Group;
