import { useLocalSearchParams } from "expo-router";

import { Section, Type } from "@components/styled";
import { Back, Button, Icon, Loading } from "@components/material";
import { ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { fetchGroup, fetchMembers, fetchPosts } from "utils/firebase";
import { Group, Member, Post } from "@types";
import { useAuth } from "@context";
import { PostCard } from "@components/pages/community";

const GroupPage = () => {
    const id = useLocalSearchParams();
    const { user } = useAuth();
    if (!id || !user) {
        return null;
    }

    const [isLoading, setIsLoading] = useState(false);
    const [isPostsLoading, setIsPostsLoading] = useState(true);
    const [data, setData] = useState<Group | null>(null);
    const [members, setMembers] = useState<Member[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);
    
    const getPosts = async (groupId: string) => {
        setIsPostsLoading(true);
        try {
            const posts = await fetchPosts(groupId);
            setPosts(posts);
        } catch (error) {
            console.log(error);
        } finally {
            setIsPostsLoading(false);
        }
    };

    const getGroup = async () => {
        console.log("fetching group");
        setIsLoading(true);
        try {
            const group = await fetchGroup(id.id as string);
            const members = await fetchMembers(group);
            setData(group);
            setMembers(members);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        console.log("recieved", id);
        getGroup();
    }, [id.id]);

    useEffect(() => {
        if (data) {
            getPosts(data.id);
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
                    <Back color="primary" />
                    <Icon name='more-vert' color='onSurfaceVariant' stylize="absolute top-[88px] right-6" />
                </Section>

                <Section stylize="mt-6 px-6">
                    <Section stylize="flex-row justify-between items-center">
                        <Type stylize="text-displaySmall text-onSurface tracking-tight">{data.name}</Type>
                        {!members.some(member => member.id === user.id) ? (
                            <Button type="filled" containerColor="bg-primary" contentColor="text-onPrimary">Join</Button>
                        ) : (
                            <Button type="filled" containerColor="bg-primary" contentColor="text-onPrimary" icon="check">Joined</Button>
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
                                    <PostCard key={index} name={post.username} group={post.groupName} content={post.content} time={post.time} />
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
