import { ScrollView } from "react-native";

import { Section, Type } from "@components/styled";
import { ActivityCard } from "@components/pages/activities";

const Activities = () => {
    return (
        <>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Section stylize='pt-[74px] px-7 mb-28'>
                    <Type weight='bold' stylize='text-displayMedium leading-[52px] tracking-tighter text-onSurface'>Suggested</Type>
                    <Type weight='bold' stylize='text-displayMedium leading-[52px] tracking-tighter text-onSurface'>Activities.</Type>

                    <Type stylize="text-bodyLarge text-onSurface tracking-widest mt-3">Personalized activities suggested by your chatbot explore this week.</Type>

                    <ActivityCard title="Activity One" description={`"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud."`} stylize="mt-10" />
                    <ActivityCard title="Activity Two" description={`"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud."`} stylize="mt-5" />
                    <ActivityCard title="Activity Three" description={`"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud."`} stylize="mt-5" />
                </Section>
            </ScrollView>
        </>
    );
}
 
export default Activities;
