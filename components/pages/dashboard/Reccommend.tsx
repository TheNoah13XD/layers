import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { router } from "expo-router";
import { Skeleton } from 'moti/skeleton';

import { fetchGroupRecommendations } from "utils/firebase";
import { Group, User } from "@types";

import { Section } from "@components/styled";
import { GroupCard } from "./GroupCard";

interface RecommendProps {
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

export const Recommend = ({ user }: RecommendProps) => {
    const { goals } = user;
    if (!goals) {
        return null;
    }

    const [groups, setGroups] = useState<Group[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const uniqueGroups = groups.filter((group, index, self) =>
        index === self.findIndex((g) => g.id === group.id)
    );

    function getRandom(arr: any[], n: number) {
        const result = new Array(n);
        let len = arr.length;
        const taken = new Array(len);
        
        if (n > len)
            throw new RangeError("getRandom: more elements taken than available");
        while (n--) {
            const x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }

        return result;
    }

    useEffect(() => {
        setLoading(true);
        const unsubscribe = fetchGroupRecommendations(user.id, goals, (recommendations) => {
            const n = Math.min(recommendations.length, 3);
            setGroups(getRandom(recommendations, n));
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user.id, goals]);

    return (
        <Section stylize='flex-row mx-1'>
            <Section stylize={`flex-row items-center ml-1 ${loading ? '' : 'hidden'}`}>
                <LoadingSkeleton loading={loading} stylize="mt-5" />
                <LoadingSkeleton loading={loading} stylize="mt-5 pl-1" />
                <LoadingSkeleton loading={loading} stylize="mt-5 pl-1" />
            </Section>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} horizontal showsHorizontalScrollIndicator={false}>
                {loading ? (
                    <LoadingSkeleton loading={loading} stylize="mt-5" />
                ) : (
                    uniqueGroups.map((item, index) => (
                        <GroupCard 
                            key={item.id}
                            name={item.name} 
                            members={item.members} 
                            stylize={`
                                ${index === 0 ? ' mt-5' : 'ml-1  mt-5'}
                                ${index === groups.length - 1 ? 'mr-2' : ''}
                            `}
                            onPress={() => {
                                router.push(`/community/explore/${item.id}`);
                            }}
                        />
                    ))
                )}
            </ScrollView>
        </Section>
    );
}
