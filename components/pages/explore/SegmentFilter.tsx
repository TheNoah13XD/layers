import { ScrollView } from "react-native";

import { Section, Type } from "@components/styled";
import { Segment } from "@components/material";

interface SegmentFilterProps {
    segments: Array<string>;
    selectedSegments: Array<string>;
    handleSegmentPress: (segment: string) => void;
    stylize?: string;
}

export const SegmentFilter = ({ segments, selectedSegments, handleSegmentPress, stylize }: SegmentFilterProps) => {
    return (
        <Section stylize={`mt-4 ${stylize}`}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Section stylize="flex-row items-center mt-2">
                    <Type stylize="text-labelLarge text-onSurface">Filter</Type>
    
                    <Section stylize="flex-row ml-6">
                        {segments.map((segment, index) => (
                            <Segment
                                key={index}
                                title={segment}
                                enabled={selectedSegments.includes(segment)}
                                onPress={() => handleSegmentPress(segment)}
                                stylize={index === 0 ? '' : 'ml-1'}
                            />
                        ))}
                    </Section>
                </Section>
            </ScrollView>
        </Section>
    );
}
