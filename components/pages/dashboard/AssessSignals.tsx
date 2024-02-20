import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { router } from "expo-router";
import { Skeleton } from 'moti/skeleton';

import { fetchUsers } from "utils/firebase";
import { User } from "@types";

import { Section } from "@components/styled";
import { GroupCard } from "./GroupCard";

interface AssessSignalsProps {
    user: User;
}

const LoadingSkeleton = ({ loading, stylize }: { loading: boolean, stylize?: string }) => (
    <Section stylize={stylize}>
        <Skeleton
            show={loading}
            colorMode="light"
            width={260}
            height={220}
            radius={25}
            colors={['#90CEF4', '#CABEFF']}
        />
    </Section>
);

export const AssessSignals = ({ user }: AssessSignalsProps) => {
    const { seekers, role } = user;
    if (!role) {
        return null;
    }

    const seeker = role === 'seeker';

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        if (seekers) {
            setIsLoading(true);
            const unsubscribe = fetchUsers(seekers, (users) => {
                setUsers(users);
                setIsLoading(false);
            });

            return () => unsubscribe();
        }
    }, [seekers]);

    return (
        <Section stylize='flex-row mx-1'>
            <Section stylize={`flex-row items-center ml-1 ${isLoading ? '' : 'hidden'}`}>
                <LoadingSkeleton loading={isLoading} stylize="mt-5" />
                <LoadingSkeleton loading={isLoading} stylize="mt-5 pl-1" />
                <LoadingSkeleton loading={isLoading} stylize="mt-5 pl-1" />
            </Section>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} horizontal showsHorizontalScrollIndicator={false}>
                {isLoading ? (
                    <LoadingSkeleton loading={isLoading} stylize="mt-5" />
                ) : (
                    users.map((item, index) => (
                        <GroupCard 
                            key={item.id}
                            name={item.name} 
                            role={role}
                            members={item.score!} 
                            stylize={`
                                ${index === 0 ? 'mt-5' : 'ml-1  mt-5'}
                                ${index === users.length - 1 ? 'mr-1' : ''}
                            `}
                            onPress={() => {
                                router.push(`/community/publicProfile/${item.id}`);
                            }}
                        />
                    ))
                )}
            </ScrollView>
        </Section>
    );
}
