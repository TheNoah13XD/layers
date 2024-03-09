import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";

import { createJournal, fetchTodayJournal } from "utils/firebase";
import { useAuth } from "@context";

import { Back, Button, Card, Icon, Loading } from "@components/material";
import { Section, Type } from "@components/styled";

const NewJournal = () => {
    const { user } = useAuth();
    if (!user) {
        return null;
    }

    const [isLoading, setIsLoading] = useState(false);
    
    const handleJournalPress = async () => {
        await createJournal(user.id);
        console.log('Journal created');
    }

    useEffect(() => {
        setIsLoading(true);
        const unsubscribe = fetchTodayJournal(user.id, (journal) => {
            if (journal) {
                router.push(`/home/records/journal/${journal.id}`);
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <Back color="primary" stylize="top-[65px]" onPress={() => router.back()} />
            <Button type="filled" containerColor="bg-primary" contentColor="text-onPrimary" onPress={() => {router.push("/home/records/journalHistory")}} stylize="absolute top-[57px] right-6">Stats</Button>

            <Section stylize="mt-[168px] px-7">
                <Type stylize="text-displayMedium tracking-tight leading-[52px] text-onSurfaceVariant">{`Start a`}</Type>
                <Type stylize="text-displayMedium tracking-tight leading-[52px] text-onSurfaceVariant">{`new journal ->`}</Type>
            </Section>

            <Section stylize="mt-10 px-7">
                <Card>
                    <Section stylize="flex-row justify-center items-center pt-2 pl-2 pb-3">
                        <Section stylize="w-[275px]">
                            <Icon name="edit" color="onPrimaryContainer" stylize="bg-primaryContainer rounded-full p-2 w-10 h-10" />

                            <Section stylize="mt-9">
                                <TouchableOpacity activeOpacity={0.7} onPress={handleJournalPress}><Type stylize="text-headlineLarge text-onSurface tracking-tight">Text Journal</Type></TouchableOpacity>
                                <Type stylize="text-bodyMedium text-onSurfaceVariant mt-1">Start a new journal, express your feelings by writing.</Type>
                            </Section>
                        </Section>

                        <TouchableOpacity activeOpacity={0.7} onPress={handleJournalPress}>
                            <Icon name="keyboard-arrow-right" color="primary" stylize="pl-6" />
                        </TouchableOpacity>
                    </Section>
                </Card>

                <Card stylize="mt-3">
                    <Section stylize="flex-row justify-center items-center pt-2 pl-2 pb-3">
                        <Section stylize="w-[275px]">
                            <Icon name="mic" color="onPrimaryContainer" stylize="bg-primaryContainer rounded-full p-2 w-10 h-10" />

                            <Section stylize="mt-9">
                                <TouchableOpacity activeOpacity={0.7} onPress={handleJournalPress}><Type stylize="text-headlineLarge text-onSurface tracking-tight">Voice Journal</Type></TouchableOpacity>
                                <Type stylize="text-bodyMedium text-onSurfaceVariant mt-1">Start a new journal, our speech-to-text AI will write your words.</Type>
                            </Section>
                        </Section>

                        <TouchableOpacity activeOpacity={0.7} onPress={handleJournalPress}>
                            <Icon name="keyboard-arrow-right" color="primary" stylize="pl-6" />
                        </TouchableOpacity>
                    </Section>
                </Card>
            </Section>
        </>
    );
}
 
export default NewJournal;
