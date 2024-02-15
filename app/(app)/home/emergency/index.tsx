import { Section, Type, Back } from "@components/styled";
import { Button, Icon } from "@components/material";
import { router } from "expo-router";

const Emergency = () => {
    return (
        <Section stylize="flex-1 justify-center items-center p-4">
            <Back onPress={() => router.back()} />
            
            <Icon family="materialCommunity" name="alert-decagram-outline" color="like" size={80} />
            <Type stylize="text-headlineSmall text-center text-onSurface tracking-tight mt-2">This will send an alert to your emergency contact, a notification to your signal and contact list</Type>
            <Button type="filled" containerColor="bg-error" contentColor="text-onError" stylize="mt-2">Proceed</Button>
        </Section>
    );
}
 
export default Emergency;
