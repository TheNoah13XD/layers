import { useEffect, useRef, useState } from "react";
import { TextInput, ScrollView, Keyboard, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { createRoom, fetchMessages, fetchUser, getRoomId, releaseSignal, sendMessage } from "utils/firebase";
import { useAuth } from "@context";
import { Message, User } from "@types";

import { CustomKeyboardView, Section, Type } from "@components/styled";
import { RoomHeader } from "@components/pages/chats";
import { FontWeight } from "@constants";
import { Dialog, Icon, Loading, Snackbar } from "@components/material";
import { MessageList } from "@components/pages/chats";

const chatRoom = () => {
    const { user } = useAuth();
    const { id, type } = useLocalSearchParams();
    if (!id || !type || !user) {
        return null;
    }

    const [dialogTitle, setDialogTitle] = useState('');
    const [dialogMessage, setDialogMessage] = useState('');
    const [openDialog, setOpenDialog] = useState(false);

    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const [isLoading, setIsLoading] = useState(false);
    const [signal, setSignal] = useState<User>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [text, setText] = useState('');
    const scrollRef = useRef<ScrollView>(null);

    const [snackbar, setSnackbar] = useState(false);
    const [error, setError] = useState('');

    const showError = (message: string) => {
        setError(message);
        setSnackbar(true);
        setTimeout(() => setSnackbar(false), 2000);
    };

    const createRoomIfNotExist = async () => {
        if (type === 'signal') {
            let roomid = getRoomId(user.id, id as string);
            await createRoom(roomid);
            console.log('room created')
        }
    };

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
    };

    const handleRelease = async () => {
        await releaseSignal(user.id, id as string);
        console.log('signal released')
        router.push('/chats');
    }; 
 
    const updateScroll = () => {
        setTimeout(() => {
            if (scrollRef.current) {
                scrollRef.current.scrollToEnd({ animated: true });
            }
        }, 100);
    };

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
                    <RoomHeader 
                        title={signal?.name!} 
                        role={user.role!} 
                        type={type as 'signal' | 'archived'}
                        handleRelease={() => {
                            setDialogTitle('Release Signal');
                            setDialogMessage('You are about to release the signal. Are you sure?');
                            setOpenDialog(true);
                        }}
                        setEmergency={() => {
                            setDialogTitle('Emergency Call');
                            setDialogMessage('Calls are for emergency reasons only!');
                            setOpenDialog(true);
                        }} 
                    /> 

                    <MessageList scrollViewRef={scrollRef} messages={messages} />

                    <Section stylize="absolute bottom-4 w-full px-6">
                        {type === 'signal' ? (
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
                        ) : (
                            <Type weight="medium" stylize="text-titleMedium text-onSurfaceVariant text-center">You can’t talk to this person anymore.</Type>
                        )}
                    </Section> 
                </Section>

                {openDialog && (
                    <Dialog 
                        title={dialogTitle}
                        icon="new-releases"
                        divider={false}
                        onConfirm={() => {
                            if (dialogTitle === 'Release Signal') {
                                handleRelease();
                                setOpenDialog(false);
                            } else {
                                showError('Calls are under development.');
                                setOpenDialog(false);
                            }
                        }}
                        onCancel={() => setOpenDialog(false)}
                        confirmText={
                            dialogTitle === 'Release Signal' ? 'Release' : 'Call' 
                        }
                        stylize="z-50"
                    > 
                        <Type stylize="text-titleLarge text-onSurfaceVariant text-center px-4 mt-4 mb-4">{dialogMessage}</Type>
                    </Dialog>
                )} 

                {snackbar && <Snackbar view={snackbar} message={error} action={() => setSnackbar(false)} stylize="mb-12" />}
            </CustomKeyboardView>
        </>
    );
}

export default chatRoom;
