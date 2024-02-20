import { router } from "expo-router";

import { Section, Type } from "@components/styled";
import { Button } from "@components/material";

export interface ViewActivitiesProps {
    role: 'seeker' | 'helper';
    stylize?: string;
}

export const ViewActivities = ({ role, stylize }: ViewActivitiesProps) => {

    const handleRoute = () => {
        if (role === 'seeker') {
            router.push('/home/activities')
        } else {
            router.push('/chats/findSignal/viewRequests');
        }
    };

    const seeker = role === 'seeker';

    return (
        <Section stylize={`flex-col justify-between ${seeker ? "bg-primaryFixedDim" : "bg-secondaryFixedDim"} rounded-[25px] p-4 ${stylize}`}>
            <Type stylize='text-titleLarge tracking-tight w-64 text-black'>
                {role === 'seeker' ? 'Activities that might interest you for this weekend.' : 'Find new signals to help, or go through signal requests.'}
            </Type>
            <Section stylize='flex-row justify-end w-full mt-12'>
                <Button type='filled' icon='arrow-right-alt' containerColor={seeker ? "bg-primary" : "bg-secondary"} contentColor={seeker ? "text-onPrimary" : "text-onSecondary"} onPress={handleRoute}>View</Button>
            </Section>
        </Section>
    );
}
