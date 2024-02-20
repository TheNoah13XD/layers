import { useEffect, useState } from "react";
import { router } from "expo-router";

import { fetchSeekers, fetchSeekersRequests, sendSignalRequest } from "utils/firebase";
import { User } from "@types";
import { useAuth } from "@context";

import { Section, Type } from "@components/styled";
import { Button, Loading, Snackbar } from "@components/material";
import { ChatHeader, FindCard } from "@components/pages/chats";

const FindSignal = () => {
    const { user } = useAuth();
    if (!user || user.role === 'seeker' && user.signal) {
        return null;
    }

    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState(false);
    const [message, setMessage] = useState('');
    const [seekers, setSeekers] = useState<User[]>([]);

    const handleSendSignal = () => {
        setSnackbar(true);
        setMessage('Signal sent!');
        setTimeout(() => setSnackbar(false), 2000);
    }

    const handleSendRequest = async (id: string) => {
        try {
            await sendSignalRequest(id, user.id, user.username);
            setSeekers(prevSeekers => prevSeekers.filter(seeker => seeker.id !== id));
        } catch (error) {
            console.error("Failed to send signal request:", error);
        } finally {
            setSnackbar(true);
            setMessage('Request sent!');
            setTimeout(() => setSnackbar(false), 2000);
        }
    }

    useEffect(() => {
        if (user.role === 'helper') {
            setLoading(true);
            const unsubscribe = fetchSeekers(async (reqs) => {
                const users: User[] = [];
                for (const req of reqs) {
                    const requests = await fetchSeekersRequests(req.id);
                    if (!requests.some(request => request.id === user.id)) {
                        if (user.goals!.some(goal => req.goals!.includes(goal))) {
                            users.push(req);
                        }
                    }
                }
                setSeekers(users);
                setLoading(false);
            });

            return () => unsubscribe();
        }
    }, [user]);

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <ChatHeader title="Find Signals" />

            {user.role === 'seeker' ? (
                <Section stylize="flex-1 justify-center items-center">
                    <Type stylize="text-displaySmall text-onSurface text-center tracking-tight w-[272px]">You don't have any helper!</Type>
                    <Section stylize="flex-row justify-center items-center mt-5">
                        <Button type="filled" containerColor="bg-secondary" contentColor="text-onSecondary" icon="language" onPress={handleSendSignal}>Send Signal</Button>
                        <Button type="outlined" contentColor="text-secondary" stylize="ml-2" onPress={() => router.push('/chats/findSignal/viewRequests')}>View Requests</Button>
                    </Section>
                </Section>
            ) : (
                <Section stylize="mt-10 px-7">
                    {user.seekers!.length < 5 ? (
                        seekers.length > 0 ? (
                            seekers.map((seeker, index) => (
                                <FindCard key={seeker.id} id={seeker.id} username={seeker.username} goals={seeker.goals!} onSuccess={() => handleSendRequest(seeker.id)} stylize={index === 0 ? 'mt-0' : 'mt-3'} />
                            ))
                        ) : (
                            <Type stylize="text-headlineMedium text-onSurfaceVariant text-center tracking-tight mt-7">No seeker found.</Type>
                        )
                    ) : (
                        <Type stylize="text-headlineMedium text-onSurfaceVariant text-center tracking-tight mt-7">You've reached the maximum number of helpers.</Type>
                    )}
                </Section>
            )}

            {snackbar && <Snackbar hasNav view={snackbar} message={message} action={() => setSnackbar(false)} />}
        </>
    );
}
 
export default FindSignal;
