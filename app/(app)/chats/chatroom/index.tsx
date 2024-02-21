import { useEffect, useRef, useState } from "react";
import { TextInput, ScrollView, Keyboard, Pressable } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { createRoom, fetchMessages, fetchUser, getRoomId, sendMessage } from "utils/firebase";
import { useAuth } from "@context";
import { Message, User } from "@types";

import { CustomKeyboardView, Section } from "@components/styled";
import { RoomHeader } from "@components/pages/chats";
import { FontWeight } from "@constants";
import { Icon, Loading } from "@components/material";
import { MessageList } from "@components/pages/chats";

const chatRoom = () => {
    const { user } = useAuth();
    const { id, type } = useLocalSearchParams();
    if (!id || !type || !user) {
        return null;
    }

    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const [isLoading, setIsLoading] = useState(false);
    const [signal, setSignal] = useState<User>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [text, setText] = useState('');
    const scrollRef = useRef<ScrollView>(null);

    const createRoomIfNotExist = async () => {
        if (type === 'signal') {
            let roomid = getRoomId(user.id, id as string);
            await createRoom(roomid);
            console.log('room created')
        }
    }

    const handleSendMessage = async () => {
        let message = text.trim();
        if (!message) {
            console.log('no message to send')
            return;
        }
    
        setText('');
        try {
            let roomid = getRoomId(user.id, id as string);
            await sendMessage(roomid, user.id, user.username, message, user.role!);
        } catch (error) {
            console.log(error);
        }
    }
 
    const updateScroll = () => {
        setTimeout(() => {
            if (scrollRef.current) {
                scrollRef.current.scrollToEnd({ animated: true });
            }
        }, 100);
    }

    useEffect(() => {
        updateScroll();
    }, [messages]);

    useEffect(() => {
        setIsLoading(true);
        createRoomIfNotExist();

        const fetchSignal = fetchUser(id as string, (signal) => {
            setSignal(signal);
        });

        let roomId = getRoomId(user.id, id as string);
        const unsubscribe = fetchMessages(roomId, (messages) => {
            setMessages(messages);
            setIsLoading(false);
        });

        const KeyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            updateScroll();
        });

        return () => {
            fetchSignal();
            unsubscribe();
            KeyboardDidShowListener.remove();
        }
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <CustomKeyboardView>
                <Section stylize="h-screen">
                    <RoomHeader title={signal?.name!} role={user.role!} />

                    <MessageList scrollViewRef={scrollRef} messages={messages} />

                    <Section stylize="absolute bottom-0 w-full px-6">
                        <Section stylize="flex-row justify-between items-center border border-outline bg-[#F5FAFF] rounded-full w-full h-[60px] pl-4">
                            <TextInput
                                value={text}
                                onChangeText={setText}
                                placeholderTextColor="#48454E"
                                placeholder={isFocused ? "" : "Type a message"} 
                                returnKeyType="send"
                                onFocus={handleFocus}
                                onBlur={handleBlur} 
                                onSubmitEditing={handleSendMessage}
                                blurOnSubmit={false}
                                style={{ fontFamily: FontWeight['regular'], flex: 1 }} 
                                className="text-bodyLarge text-onSurface"
                            /> 
                            <Pressable className="flex justify-center items-center bg-primaryContainer rounded-full w-14 h-14" onPress={handleSendMessage}>
                                <Icon family="material" name="send" size={16} color="primary" /> 
                            </Pressable>
                        </Section>
                    </Section> 
                </Section>
            </CustomKeyboardView>
        </>
    );
}

export default chatRoom;
