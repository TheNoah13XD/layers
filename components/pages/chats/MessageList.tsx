import { ScrollView } from "react-native";

import { Message } from "@types";

import { Section, Type } from "@components/styled";
import { MessageItem } from "./MessageItem";
import { Icon } from "@components/material";

interface MessageListProps {
    scrollViewRef: React.RefObject<ScrollView>;
    messages: Message[];
}

export const MessageList = ({ scrollViewRef, messages }: MessageListProps) => {
    return (
        <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: 150, paddingBottom: 80 }} className="w-full h-full">
            {messages.length > 0 ? (
                messages.map((message, index) => (
                    <MessageItem key={index} message={message} />
                ))
            ) : (
                <Section stylize="flex-1 justify-center items-center mt-10">
                    <Icon name="waving-hand" color="primary" size={80} />
                    <Type stylize="text-displaySmall text-primary text-center leading-[44px] tracking-tight w-60 mt-3">Say hello to your new signal!</Type>
                </Section>
            )}
        </ScrollView>
    );
}
