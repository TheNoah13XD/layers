import { useAuth } from "@context";

import { Section, Type } from "@components/styled";
import { Button } from "@components/material";

const Settings = () => {
    const { signout } = useAuth();

    return (
        <>
            <Section stylize="flex-1 justify-center items-center">
                <Section stylize="flex-row items-center">
                    <Type stylize="text-headlineLarge text-onSurface tracking-tight">Sign Out:</Type>
                    <Button type="filled" containerColor="bg-primary" contentColor="text-onPrimary" stylize="ml-4" onPress={signout}>Here.</Button>
                </Section>
            </Section>
        </>
    );
}
 
export default Settings;
