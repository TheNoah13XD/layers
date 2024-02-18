import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { router } from "expo-router";

import { fetchPostsOfUser } from "utils/firebase";
import { useAuth } from "@context";
import { Post } from "@types";

import { Section, Type } from "@components/styled";
import { Button, Card, Loading } from "@components/material";
import { PostCard } from "@components/pages/community";
import { IndexScore, ProfileHeader } from "@components/pages/profile";

const Profile = () => {
    const { user } = useAuth();
    if (!user || !user.score) {
        return null;
    }

    const [isPostsLoading, setIsPostsLoading] = useState(true);
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const unsubscribe = fetchPostsOfUser(user.id, (posts) => {
            setPosts(posts);
            setIsPostsLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    return (
        <ScrollView>
            <ProfileHeader name={user.name} bio={user.bio} />

            <Section stylize="mt-6 px-7">
                <Card>
                    <IndexScore score={user.score} />
                </Card>

                <Card stylize="mt-3">
                    <Section stylize="flex-row justify-between w-full px-2">
                        <Type stylize="text-headlineMedium text-onSurfaceVariant tracking-tight">Journals</Type>
                        <Button type="filled" icon="arrow-right-alt" containerColor="bg-primary" contentColor="text-onPrimary" onPress={() => router.push('/home/records/journalHistory')}>Logs</Button>
                    </Section>
                </Card>

                <Card stylize="mt-6 px-0 pb-0 mb-24">
                    <Section stylize="mt-4">
                        <Type stylize="text-headlineMedium text-onSurfaceVariant tracking-tight pl-5">Your Posts</Type>
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
                                    name={post.username}
                                    group={post.groupName}
                                    content={post.content}
                                    time={post.time}
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
 
export default Profile;
