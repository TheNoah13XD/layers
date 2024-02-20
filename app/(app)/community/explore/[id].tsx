import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { fetchGroup, fetchMembers, fetchPosts, addMember, removeMember } from "utils/firebase";
import { Group, Member, Post } from "@types";
import { useAuth } from "@context";

import { Section, Type } from "@components/styled";
import { Back, Button, Icon, Loading } from "@components/material";
import { PostCard } from "@components/pages/community";

const GroupPage = () => {
    const id = useLocalSearchParams();
    const { user } = useAuth();
    if (!id || !user) {
        return null;
    }

    const [isLoading, setIsLoading] = useState(true);
    const [isPostsLoading, setIsPostsLoading] = useState(true);
    const [data, setData] = useState<Group | null>(null);
    const [members, setMembers] = useState<Member[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);

    const joinGroup = async () => {
        if (data) {
            try {
                await addMember(data, user.id, user.username);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const leaveGroup = () => {
        if (data) {
            try {
                removeMember(data, user.id);
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        const unsubscribeGroup = fetchGroup(id.id as string, (group) => {
            setData(group);
            setIsLoading(false);

            const unsubscribeMembers = fetchMembers(group, (members) => {
                setMembers(members);
            });
            return () => unsubscribeMembers();
        });

        return () => unsubscribeGroup();
    }, [id.id]);

    useEffect(() => {
        if (data) {
            const unsubscribe = fetchPosts(data.id, (posts) => {
                setPosts(posts);
                setIsPostsLoading(false);
            });

            return () => unsubscribe();
        }
    }, [data]);

    if (isLoading) {
        return <Loading />;
    }

    if (!data) {
        return null;
    }

    return (
        <ScrollView>
            <Section stylize="mb-24">
                <Section stylize="bg-primaryContainer rounded-b-[50px] w-full h-[280px]">
                    <Back color="primary" onPress={() => router.push('/community/explore/')} />
                    <Icon name='more-vert' color='primary' stylize="absolute top-[88px] right-6" />
                </Section>

                <Section stylize="mt-6 px-6">
                    <Section stylize="flex-row justify-between items-center">
                        <Type stylize="text-displaySmall text-onSurface tracking-tight">{data.name}</Type>
                        {!members.some(member => member.id === user.id) ? (
                            <Button type="filled" containerColor="bg-primary" contentColor="text-onPrimary" onPress={joinGroup}>Join</Button>
                        ) : (
                            <Button type="filled" containerColor="bg-primary" contentColor="text-onPrimary" icon="check" onPress={leaveGroup}>Joined</Button>
                        )}
                    </Section>
                    <Type stylize="text-bodyLarge text-onSurface text-center px-8 mt-3">{data.description}</Type>

                    <Type stylize="text-headlineSmall text-onSurface mt-6">Posts</Type>
                    <Section stylize="mt-6">
                        {isPostsLoading ? (
                            <Loading stylize="mt-6" />
                        ) : (
                            posts.length === 0 ? (
                                <Type stylize="text-headlineSmall text-onSurface text-center mt-6">No posts yet.</Type>
                            ) : (
                                posts.map((post, index) => (
                                    <PostCard 
                                        key={index} 
                                        id={post.id}
                                        userId={post.user}
                                        name={post.username} 
                                        group={post.groupName} 
                                        content={post.content} 
                                        likedBy={post.likedBy}
                                        time={post.time} 
                                        stylize={`${index === 0 ? '' : 'mt-3'}`}
                                    />
                                ))
                            )
                        )}
                    </Section>
                </Section>
            </Section>
        </ScrollView>
    );
}
 
export default GroupPage;
