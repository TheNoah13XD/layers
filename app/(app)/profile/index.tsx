import { useEffect } from "react";
import { ScrollView } from "react-native";
import { router } from "expo-router";

import { useAuth } from "@context";

import { Section, Type } from "@components/styled";
import { Button, Card } from "@components/material";
import { Post } from "@components/pages/community";
import { ProfileHeader } from "@components/pages/profile";

const Profile = () => {
    const { user, isAuthenticated } = useAuth();
    if (!user) {
        return null;
    }

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace('/start');
        } else if (!user.role) {
            router.replace('/assessments');
        }
    }, [isAuthenticated]);

    return (
        <ScrollView>
            <ProfileHeader name={user.name} bio="I like pies." />

            <Section stylize="mt-6 px-7">
                <Card>
                    <Section stylize="p-2">
                        <Section stylize="flex-row">
                            <Type stylize="text-headlineMedium text-onSurfaceVariant tracking-tight">Layer Index:</Type>
                            <Type stylize="text-headlineMedium text-primary tracking-tight pl-3">82</Type>
                        </Section>

                        <Section stylize="mt-6">
                            <Type stylize="text-titleMedium text-onSurface">"Soaring high with a score above 80! Your strength is inspiring—keep shining on the journey to well-being!"</Type>
                        </Section>
                    </Section>
                </Card>

                <Card stylize="mt-3">
                    <Section stylize="flex-row justify-between w-full px-2">
                        <Type stylize="text-headlineMedium text-onSurfaceVariant tracking-tight">Journals</Type>
                        <Button type="filled" icon="arrow-right-alt" containerColor="bg-primary" contentColor="text-onPrimary">Logs</Button>
                    </Section>
                </Card>

                <Card stylize="mt-6 px-0 pb-0 mb-24">
                    <Section stylize="mt-4">
                        <Type stylize="text-headlineMedium text-onSurfaceVariant tracking-tight pl-5">Your Posts</Type>
                    </Section>

                    <Post name={"Totally Human"} group={"Chill"} content={"Sometimes I wonder, if James Bond is the most famous spy, wouldn't that also make him the worst spy?"} stylize='mt-7' />
                    <Post name={"Totally Human"} group={"Chill"} content={"Sometimes I wonder, if James Bond is the most famous spy, wouldn't that also make him the worst spy?"} stylize='mt-3' />
                </Card>
            </Section>
        </ScrollView>
    );
}
 
export default Profile;
