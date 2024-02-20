import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { fetchPostsOfUser, fetchUser } from "utils/firebase";
import { Post, User } from "@types";

import { Card, Loading } from "@components/material";
import { Section, Type } from "@components/styled";
import { IndexScore, PublicHeader } from "@components/pages/profile";
import { PostCard } from "@components/pages/community";

const publicProfile = () => {
    const id = useLocalSearchParams();
    if (!id) {
        return null;
    }

    const [isLoading, setIsLoading] = useState(false);
    const [isPostsLoading, setIsPostsLoading] = useState(true);
    const [data, setData] = useState<User>();
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        setIsLoading(true);
        const unsubscribeGroup = fetchUser(id.id as string, (user) => {
            setData(user);
            setIsLoading(false);
        });

        return () => unsubscribeGroup();
    }, [id.id]);

    useEffect(() => {
        if (!data) {
            return;
        }

        const unsubscribe = fetchPostsOfUser(data.id, (posts) => {
            setPosts(posts);
            setIsPostsLoading(false);
        });

        return () => unsubscribe();
    }, [data]);

    if (isLoading) {
        return <Loading />;
    }

    if (!data) {
        return null;
    }

    return (
        <ScrollView>
            <PublicHeader username={data.username} bio={data.bio!} role={data.role!} />

            <Section stylize="mt-6 px-7">
                <Card>
                    <IndexScore score={data.score!} />
                </Card>
            </Section>

            <Section stylize="px-7">
                <Card stylize="mt-6 px-0 pb-0 mb-24">
                    <Section stylize="mt-4">
                        <Type stylize="text-headlineMedium text-onSurfaceVariant tracking-tight pl-5">Posts</Type>
                    </Section>

                    {isPostsLoading ? (
                        <Loading stylize="mt-6" />
                    ) : (
                        posts.length === 0 ? (
                            <Type stylize="text-headlineSmall text-onSurfaceVariant text-center mt-10 mb-6">No posts yet.</Type>
                        ) : (
                            posts.map((post, index) => (
                                <PostCard
                                    key={index}
                                    id={post.id}
                                    userId={data.id}
                                    name={post.username}
                                    group={post.groupName}
                                    content={post.content}
                                    time={post.time}
                                    likedBy={post.likedBy}
                                    stylize={`${index === 0 ? 'mt-6' : 'mt-3'}`}
                                />
                            ))
                        )
                    )}
                </Card>
            </Section>
        </ScrollView>
    );
}
 
export default publicProfile;
