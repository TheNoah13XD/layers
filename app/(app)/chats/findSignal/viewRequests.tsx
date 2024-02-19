import { useEffect, useState } from "react";

import { fetchUserSignalRequests, updateSigalRequest } from "utils/firebase";
import { useAuth } from "@context";
import { SignalRequest } from "@types";

import { Section, Type } from "@components/styled";
import { Loading } from "@components/material";
import { ChatHeader, RequestCard } from "@components/pages/chats";

const ViewRequests = () => {
    const { user } = useAuth();
    if (!user || user.signal) {
        return null;
    }

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
                    requests.map((req) => (
                        <RequestCard key={req.id} username={req.username} time={req.time} onSuccess={() => handleSuccess(req)} onDecline={() => handleDecline(req)} />
                    ))
                ) : (
                    <Type stylize="text-headlineMedium text-onSurfaceVariant text-center tracking-tight px-10">You don't have any Signal requests!</Type>
                )}
            </Section>
        </>
    );
}
 
export default ViewRequests;