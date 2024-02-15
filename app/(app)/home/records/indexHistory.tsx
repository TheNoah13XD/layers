import { ScrollView } from "react-native";

import { useAuth } from "@context";

import { Section, Type } from "@components/styled";
import { Segment } from "@components/material";
import { RecordDiv, RecordStats } from "@components/pages/records";

const IndexHistory = () => {
    const { user} = useAuth();
    if (!user) {
        return null;
    }

    return (
        <ScrollView>
            <Section stylize="items-center mt-[68px]">
                <RecordStats score={user.score!} type="index" />
            </Section>

            <Section stylize="px-7 mt-7">
                <Type stylize="text-headlineMedium text-onSurfaceVariant tracking-tight">Index History</Type>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <Section stylize="flex-row items-center mt-2">
                        <Type stylize="text-labelLarge text-onSurface">Filter</Type>

                        <Section stylize="flex-row ml-6">
                            <Segment title='This Week' enabled={true} />
                            <Segment title='Last Week' enabled={false} stylize='ml-1' />
                            <Segment title='Custom' enabled={false} icon="date-range" stylize='ml-1' />
                        </Section>
                    </Section>
                </ScrollView>

                <Section stylize="mt-7 mb-24">
                    <RecordDiv score={80} date="19/01/24" day="Friday" />
                    <RecordDiv score={80} date="19/01/24" day="Friday" stylize="mt-2" />
                    <RecordDiv score={80} date="19/01/24" day="Friday" stylize="mt-2" />
                    <RecordDiv score={80} date="19/01/24" day="Friday" stylize="mt-2" />
                    <RecordDiv score={80} date="19/01/24" day="Friday" stylize="mt-2" />
                    <RecordDiv score={80} date="19/01/24" day="Friday" stylize="mt-2" />
                </Section>
            </Section>
        </ScrollView>
    );
}
 
export default IndexHistory;
