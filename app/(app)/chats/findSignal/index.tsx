import { useState } from "react";
import { router } from "expo-router";

import { useAuth } from "@context";

import { Section, Type } from "@components/styled";
import { Button, Snackbar } from "@components/material";
import { ChatHeader } from "@components/pages/chats";

const FindSignal = () => {
    const { user } = useAuth();
    if (!user || user.signal) {
        return null;
    }

    const [snackbar, setSnackbar] = useState(false);
    const [message, setMessage] = useState('');

    const handleSendSignal = () => {
        setSnackbar(true);
        setMessage('Signal sent!');
        setTimeout(() => setSnackbar(false), 2000);
    }

    return (
        <>
            <ChatHeader title="Find Signals" />

            <Section stylize="flex-1 justify-center items-center">
                <Type stylize="text-displaySmall text-onSurface text-center tracking-tight w-[272px]">You don't have any helper!</Type>
                <Section stylize="flex-row justify-center items-center mt-5">
                    <Button type="filled" containerColor="bg-secondary" contentColor="text-onSecondary" icon="language" onPress={handleSendSignal}>Send Signal</Button>
                    <Button type="outlined" contentColor="text-secondary" stylize="ml-2" onPress={() => router.push('/chats/findSignal/viewRequests')}>View Requests</Button>
                </Section>
            </Section>

            {snackbar && <Snackbar hasNav view={snackbar} message={message} action={() => setSnackbar(false)} />}
        </>
    );
}
 
export default FindSignal;
