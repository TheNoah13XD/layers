import { useState } from "react";
import { router } from "expo-router";

import { Section, Type } from "@components/styled";
import { Back, Button, Icon, Snackbar } from "@components/material";

const Emergency = () => {
    const [snackbar, setSnackbar] = useState(false);
    const [message, setMessage] = useState('');

    const handleEmergency = () => {
        setSnackbar(true);
        setMessage('Note: This is under development and will not send any alerts at the moment.'); 
        setTimeout(() => setSnackbar(false), 4000);
    }

    return (
        <Section stylize="flex-1 justify-center items-center p-4">
            <Back onPress={() => router.back()} />
            
            <Icon family="materialCommunity" name="alert-decagram-outline" color="like" size={80} />
            <Type stylize="text-headlineSmall text-center text-onSurface tracking-tight mt-2">This will send an alert to your emergency contact, a notification to your signal and contact list</Type>
            <Button type="filled" containerColor="bg-error" contentColor="text-onError" stylize="mt-2" onPress={handleEmergency}>Proceed</Button>

            {snackbar && <Snackbar noAction  view={snackbar} message={message} action={() => setSnackbar(false)} stylize="mb-24 px-4" stylizeMessage="text-center" />}
        </Section>
    );
}
 
export default Emergency;
