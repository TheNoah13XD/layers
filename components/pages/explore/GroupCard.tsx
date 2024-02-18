import { TouchableOpacity } from "react-native";
import { router } from "expo-router";

import { Group } from "@types";

import { Section, Type } from "@components/styled";
import { Button, Card, Icon } from "@components/material";

interface GroupCardProps {
    group: Group;
    isFirst: boolean;
}

export const GroupCard = ({ group, isFirst }: GroupCardProps) => {
    return (
        <Card stylize={isFirst ? '' : 'mt-3'}>
            <Section stylize="flex-row justify-between items-center px-3 pt-2">
                <Section stylize="flex-row items-center bg-primaryContainer rounded-full px-3 py-1">
                    <Icon name="diversity-1" color="onPrimaryContainer" />
                    <Type stylize="text-bodyLarge text-onPrimaryContainer tracking-wider pl-2">{group.members}</Type>
                </Section>
    
                <Button type="filled" containerColor="bg-primary" contentColor="text-onPrimary" onPress={() => {
                    router.push(`/community/explore/${group.id}`)
                }}>Join</Button>
            </Section>
    
            <Section stylize="mt-7 px-3 mb-2">
                <TouchableOpacity activeOpacity={0.7} onPress={() => { router.push(`/community/explore/${group.id}`) }}>
                    <Type stylize="text-headlineSmall text-onSurface">{group.name}</Type>
                </TouchableOpacity>
                <Type stylize="text-bodyMedium text-onSurface mt-2">{group.description}</Type>
            </Section>
        </Card>
    );
}
