import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";

import { Section, Type } from "@components/styled";
import { Button, Card, Icon, Snackbar } from "@components/material";

interface FindCardProps {
    id: string;
    username: string;
    goals: string[];
    onSuccess: () => void;
    stylize?: string;
}

export const FindCard = ({ id, username, goals, onSuccess, stylize }: FindCardProps) => {
    const [snackbar, setSnackbar] = useState(false);
    const [message, setMessage] = useState('');

    const handleViewGoals = () => {
        setSnackbar(true);
        setMessage(goals.join(', ')); 
        setTimeout(() => setSnackbar(false), 2000);
    }

    return(
        <Section stylize="h-full">
            <Card stylize={`py-5 pl-5 pr-6 ${stylize}`}>
                <Section stylize="flex-row justify-between items-center">
                    <Section stylize="flex-row justify-center items-center">
                        <Section stylize='flex justify-center items-center bg-primaryContainer rounded-full w-10 h-10'>
                            <Icon family='materialCommunity' name='account-outline' color='primary' size={24} />
                        </Section>
                        <Section stylize="ml-2">
                            <TouchableOpacity activeOpacity={0.7} onPress={() => router.push(`/community/publicProfile/${id}`)}>
                                <Type stylize="text-bodyMedium text-onSurface">{username}</Type>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.7} onPress={handleViewGoals}>
                                <Type stylize="text-bodySmall text-primary">View Goals</Type>
                            </TouchableOpacity>
                        </Section>
                    </Section>

                    <Button type="filled" containerColor="bg-primary" contentColor="text-onPrimary" onPress={onSuccess}>Request</Button>
                </Section>
            </Card>

            {snackbar && <Snackbar hasNav view={snackbar} message={message} action={() => setSnackbar(false)} stylize="mb-36" />}
        </Section>
    );
}
