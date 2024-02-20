import { useAuth } from "@context";

import { Icon } from "@components/material";
import { Section, Type } from "@components/styled";

export interface ProfileHeaderProps {
    name: string;
    role: 'helper' | 'seeker';
    bio?: string;
    stylize?: string;
}

export const ProfileHeader = ({ name, role, bio, stylize }: ProfileHeaderProps) => {
    const { signout } = useAuth();
    const seeker = role === 'seeker';

    return (
        <>
            <Section stylize={`absolute top-0 ${seeker ? "bg-primaryContainer" : "bg-secondaryContainer"} rounded-b-[50px] w-full h-[280px] ${stylize}`} />
            <Section stylize="absolute top-[200px] w-full">
                <Section stylize={`self-center ${seeker ? "bg-primaryFixedDim" : "bg-secondaryFixedDim"} rounded-[25px] w-40 h-40`} />
            </Section>

            <Icon name="settings" color="onSurfaceVariant" stylize="absolute top-[74px] right-5 flex justify-center items-center bg-onPrimary rounded-full w-12 h-12" onPress={signout} />

            <Section stylize="mt-96">
                <Type stylize="text-center text-headlineSmall text-onSurface">{name}</Type>
                {bio && <Type stylize="text-center text-bodySmall text-onSurface tracking-wide mt-1">{bio}</Type>}
            </Section>
        </>
    );
}
