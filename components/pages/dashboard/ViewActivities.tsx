import { router } from "expo-router";

import { Section, Type } from "@components/styled";
import { Button } from "@components/material";

export interface ViewActivitiesProps {
    stylize?: string;
}

export const ViewActivities = ({ stylize }: ViewActivitiesProps) => {
    return (
        <Section stylize={`flex-col justify-between bg-primaryFixedDim rounded-[25px] p-4 ${stylize}`}>
            <Type stylize='text-titleLarge tracking-tight w-64 text-black'>Activities that might interest you for this weekend.</Type>
            <Section stylize='flex-row justify-end w-full mt-12'>
                <Button type='filled' icon='arrow-right-alt' containerColor='bg-primary' contentColor='text-onPrimary' onPress={() => router.push('/home/activities')}>View</Button>
            </Section>
        </Section>
    );
}
