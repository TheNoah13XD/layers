import { useAuth } from "@context";
import { Message } from "@types";

import { Section, Type } from "@components/styled";

interface MessageItemProps {
    message: Message;
}

export const MessageItem = ({ message }: MessageItemProps) => {
    const { user } = useAuth();
    if (!user) {
        return null;
    }

    return (
        <>
            {message.userId === user.id ? (
                <Section stylize="flex justfiy-end mb-2 mr-6">
                    <Section stylize="pl-24">
                        <Section stylize={`flex self-end ${message.role === "seeker" ? "bg-primaryContainer" : message.role === "helper" ? "bg-secondaryContainer" : "bg-tertiaryContainer" } rounded-b-[24px] rounded-tl-[24px] px-4 py-3`}>
                            <Type stylize={`text-bodyLarge ${message.role === "seeker" ? "text-black" : message.role === "helper" ? "text-onSecondaryContainer" : "text-onTertiaryContainer" }`}>{message.message}</Type>
                        </Section>
                    </Section>
                </Section>
            ) : (
                <Section stylize="mb-2 ml-6">
                    <Section stylize="pr-24">
                        <Section stylize={`flex self-start ${message.role === "seeker" ? "bg-primaryContainer" : message.role === "helper" ? "bg-secondaryContainer" : "bg-tertiaryContainer" } rounded-b-[24px] rounded-tr-[24px] px-4 py-3`}>
                            <Type stylize={`text-bodyLarge ${message.role === "seeker" ? "text-black" : message.role === "helper" ? "text-onSecondaryContainer" : "text-onTertiaryContainer" }`}>{message.message}</Type>
                        </Section>
                    </Section>
                </Section>
            )}
        </>
    );
}
