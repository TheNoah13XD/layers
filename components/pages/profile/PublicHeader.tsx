import { useRouter } from "expo-router";

import { Section, Type } from "@components/styled";
import { Back, Icon } from "@components/material";

interface PublicHeaderProps {
    username: string;
    bio: string;
    role: string;
}

export const PublicHeader = ({ username, bio, role }: PublicHeaderProps) => {
    const router = useRouter();

    return (
        <>
            <Section stylize={`absolute top-0 ${role === "seeker" ? "bg-primaryContainer" : "bg-secondaryContainer"} rounded-b-[50px] w-full h-[280px]`} />
            <Section stylize="absolute top-[200px] w-full">
                <Section stylize={`self-center ${role === "seeker" ? "bg-primaryFixedDim" : "bg-secondaryFixedDim"} rounded-[25px] w-40 h-40`} />
            </Section>

            <Back onPress={() => router.back()} color={role === "seeker" ? "primary" : "secondary"} />
            <Icon name="more-vert" color={role === "seeker" ? "primary" : "secondary"} stylize="absolute top-[88px] right-6"  />

            <Section stylize="flex-row justify-between items-center mt-[384px] px-7">
                <Section>
                    <Type stylize="text-headlineSmall text-onSurface">{username}</Type>
                    <Type stylize="text-bodySmall text-onSurfaceVariant mt-1">{bio}</Type>
                </Section>

                <Type stylize="text-bodyLarge text-onSurface">Role: <Type stylize="text-primary">{role}</Type></Type>
            </Section>
        </>
    );
};