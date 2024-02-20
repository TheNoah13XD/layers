import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Timestamp } from "firebase/firestore";
import { formatDistanceToNow } from "date-fns";

import { useAuth } from "@context";

import { Section, Type } from "@components/styled";
import { Card, Icon } from "@components/material";
import { Like } from "./Like";
import { addLike, removeLike } from "utils/firebase";

export interface PostCardProps {
    id: string;
    userId: string;
    name: string;
    group: string;
    groupId: string;
    content: string;
    likedBy: string[];
    time?: Timestamp;
    stylize?: string;
}

export const PostCard = ({ id, userId, name, group, groupId, content, likedBy, time, stylize }: PostCardProps) => {
    const { user } = useAuth();
    const isLiked = likedBy.includes(user?.id || "");

    const postTime = time?.toDate().getTime();
    const getTimeAgo = () => {
        if (!postTime) return "";
        return formatDistanceToNow(postTime, { addSuffix: true });
    };

    const handleUserRoute = () => {
        if (user?.id !== userId) {
            router.push(`/community/publicProfile/${userId}`);
        }
    }

    const handleLike = async () => {
        if (isLiked) {
            await removeLike(id, user?.id!);
        } else {
            await addLike(id, user?.id!);
        }
    };

    return (
        <Card stylize={stylize}>
            <Section stylize={`flex-row justify-between items-center pt-2 pl-2 pr-1`}>
                <Section stylize='flex-row items-center'>
                    <Section stylize='flex justify-center items-center bg-primaryContainer rounded-full w-10 h-10'>
                        <Icon family='materialCommunity' name='account-outline' color='primary' size={28} />
                    </Section>
                    <Section stylize='ml-2'>
                        <TouchableOpacity activeOpacity={0.7} onPress={handleUserRoute}>
                            <Type stylize='text-bodyMedium text-onSurface leading-[20px] tracking-wide'>{name}</Type>
                        </TouchableOpacity>
                        <Section stylize='flex-row'>
                            <Type stylize='text-bodySmall text-onSurfaceVariant leading-[16px] tracking-wide'>on:</Type>
                            <TouchableOpacity activeOpacity={0.7} onPress={() => router.push(`/community/explore/${groupId}`)}>
                                <Type stylize='text-bodySmall text-primary leading-[16px] tracking-wide pl-2'>{group}</Type>
                            </TouchableOpacity>
                            <Type stylize='text-bodySmall text-onSurfaceVariant leading-[16px] tracking-wide pl-2'>•</Type>
                            <Type stylize='text-bodySmall text-onSurfaceVariant leading-[16px] tracking-wide pl-2'>{getTimeAgo()}</Type>
                        </Section>
                    </Section>
                </Section>
                <Icon name='more-vert' color='onSurfaceVariant' />
            </Section>

            <Section stylize='mt-[18px] pl-2'>
                <Type weight='medium' stylize='text-bodySmall leading-[16px] text-black tracking-wide'>{content}</Type>
            </Section>

            <Section stylize='flex-row self-end mt-8'>
                <Like liked={isLiked} action={() => handleLike()} />
                <Icon family='materialCommunity' name='comment-outline' color='onSurface' stylize='pl-5' />
                <Icon name='share' color='onSurface' stylize='pl-5' />
            </Section>
        </Card>
    );
}
