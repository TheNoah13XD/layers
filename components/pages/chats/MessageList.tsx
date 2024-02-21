import { ScrollView } from "react-native";

import { Message } from "@types";

import { Section } from "@components/styled";
import { MessageItem } from "./MessageItem";

interface MessageListProps {
    scrollViewRef: React.RefObject<ScrollView>;
    messages: Message[];
}

export const MessageList = ({ scrollViewRef, messages }: MessageListProps) => {
    return (
        <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: 10, paddingBottom: 80 }} className="w-full">
            {messages.length > 0 ? (
                messages.map((message, index) => (
                    <MessageItem key={index} message={message} />
                ))
            ) : (
                <Section>

                </Section>
            )}
        </ScrollView>
    );
}
