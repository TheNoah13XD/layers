import { useEffect, useState, useCallback } from "react";
import { FlatList } from "react-native";
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
    
    const getGroups = useCallback(async () => {
        setLoading(true);
        try {
            const recommendations = await fetchGroupRecommendations(user.id, goals);
            setGroups(getRandom(recommendations, 3));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [user.id, goals]);

    useEffect(() => {
        getGroups();
    }, [getGroups]);

    return (
        <FlatList 
            data={groups}
            keyExtractor={group => group.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            ListHeaderComponent={(
                <Section stylize='flex-row mx-1'>
                    <Section stylize={`flex-row items-center ml-1 ${loading ? '' : 'hidden'}`}>
                        <LoadingSkeleton loading={loading} stylize="mt-5" />
                        <LoadingSkeleton loading={loading} stylize="mt-5 pl-1" />
                        <LoadingSkeleton loading={loading} stylize="mt-5 pl-1" />
                    </Section>    
                </Section>
            )}
            renderItem={({ item, index }) => (
                loading ? <LoadingSkeleton loading={loading} stylize="mt-5" /> : (
                    <GroupCard 
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
                )
            )}
        />
    );
}
