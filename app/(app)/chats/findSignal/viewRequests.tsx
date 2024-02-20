import { useEffect, useState } from "react";

import { fetchUserSignalRequests, updateSigalRequest } from "utils/firebase";
import { useAuth } from "@context";
import { SignalRequest } from "@types";

import { Section, Type } from "@components/styled";
import { Loading } from "@components/material";
import { ChatHeader, RequestCard } from "@components/pages/chats";
import { router } from "expo-router";

const ViewRequests = () => {
    const { user } = useAuth();
    if (!user || user.signal) {
        return null;
    }

    useEffect(() => {
        if (user && user.role === 'helper') {
            router.push('/chats/findSignal');
        }
    }, [user]);

    const [isLoading, setIsLoading] = useState(false);
    const [requests, setRequests] = useState<SignalRequest[]>([]);

    const handleSuccess = async ({ id, username }: SignalRequest) => {
        console.log(user.id, id, 'add')
        try {
            await updateSigalRequest(user.id, username, id, 'add');
        } catch (error) {
            console.error(error);
        }
    };

    const handleDecline = async ({ id }: SignalRequest) => {
        console.log(user.id, id, 'remove')
        try {
            await updateSigalRequest(user.id, '', id, 'remove');
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        const unsubscribe = fetchUserSignalRequests(user.id, (reqs) => {
            setRequests(reqs);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <ChatHeader title="View Requests" />

            <Section stylize="mt-10 px-6">
                {requests.length > 0 ? (
                    requests.map((req, index) => (
                        <RequestCard key={req.id} id={req.id} username={req.username} time={req.time} onSuccess={() => handleSuccess(req)} onDecline={() => handleDecline(req)} stylize={index === 0 ? 'mt-0' : 'mt-3'} />
                    ))
                ) : (
                    <Type stylize="text-headlineMedium text-onSurfaceVariant text-center tracking-tight px-10">You don't have any Signal requests!</Type>
                )}
            </Section>
        </>
    );
}
 
export default ViewRequests;