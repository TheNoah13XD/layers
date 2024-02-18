import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { router } from "expo-router";

import { fetchGroups } from "utils/firebase";
import { Group } from "@types";

import { Section, Type } from "@components/styled";
import { Icon, Loading } from "@components/material";
import { GroupCard, SearchBar, SegmentFilter } from "@components/pages/explore";

const Search = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedSegments, setSelectedSegments] = useState<string[]>([]);

    const [data, setData] = useState<Group[]>([]);
    const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);

    const handleSegmentPress = (segment: string) => {
        setSelectedSegments(prev => {
            if (prev.includes(segment)) {
                return prev.filter(s => s !== segment);
            } else {
                return [...prev, segment];
            }
        });
    };

    useEffect(() => {
        setIsLoading(true);
        const unsubscribe = fetchGroups((groups) => {
            setData(groups);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        let result = data;
    
        if (selectedSegments.length > 0) {
            result = result.filter(group => group.tags.some(tag => selectedSegments.includes(tag)));
        }
    
        if (search) {
            result = result.filter(group => group.name.toLowerCase().includes(search.toLowerCase()));
        }
    
        setFilteredGroups(result);
    }, [selectedSegments, search, data]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Section stylize='pt-[74px] px-7 mb-28'>
                <Section stylize="flex-row justify-between items-center w-full">
                    <Section>
                        <Type weight='bold' stylize='text-displayMedium leading-[52px] tracking-tighter text-onSurface'>Search</Type>
                        <Type weight='bold' stylize='text-displayMedium leading-[52px] tracking-tighter text-onSurface'>Groups.</Type>
                    </Section>
                    <Icon name="language" color="onSecondaryContainer" stylize="bg-secondaryContainer rounded-full p-3" onPress={() => router.push('/community')} />
                </Section>

                <SearchBar search={search} setSearch={setSearch} />

                <SegmentFilter selectedSegments={selectedSegments} handleSegmentPress={handleSegmentPress} />

                <Section stylize="mt-10">
                    {filteredGroups.length > 0 ? (
                        filteredGroups.map((group, index) => (
                            <GroupCard key={index} group={group} isFirst={index === 0} />
                        ))
                    ) : (
                        <Type stylize="text-headlineSmall text-onSurface text-center">No groups found.</Type>
                    )}
                </Section>
            </Section>
        </ScrollView>
    );
}
 
export default Search;
