import { useEffect, useState } from "react";
import { Keyboard, TextInput } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { createPost, fetchGroup } from "utils/firebase";
import { Group } from "@types";
import { FontWeight } from "@constants";
import { useAuth } from "@context";

import { CustomKeyboardView, Section, Type } from "@components/styled";
import { Button, Fab, Select, Snackbar } from "@components/material";

const NewPost = () => {
    const { user } = useAuth();
    const { type } = useLocalSearchParams();
    if (!user || !type || !user.groups) {
        return null;
    }

    const [userGroups, setUserGroups] = useState<Group[]>([]);

    const [Loading, setLoading] = useState(false);
    const [content, setContent] = useState<string>('');
    const [selectGroup, setSelectGroup] = useState<any>('');
    const groups = userGroups.map(group => ({ label: group.name, value: group.id }));

    const [isFocused, setIsFocused] = useState(false);
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const [snackbar, setSnackbar] = useState(false);
    const [error, setError] = useState('');

    const showError = (message: string) => {
        setError(message);
        setSnackbar(true);
        setTimeout(() => setSnackbar(false), 2000);
    };

    const handleNewPost = async () => {
        if (content && selectGroup) {
            setLoading(true);
            await createPost(user.id, user.username, selectGroup.value, selectGroup.label, content);
            router.back();
        } else {
            showError("Please fill in all fields");
        }
    }

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    useEffect(() => {
        if (user.groups) {
            user.groups.forEach(group => {
                const unsubscribe = fetchGroup(group, (value) => {
                    setUserGroups(prev => {
                        if (!prev.some(g => g.id === value.id)) {
                            return [...prev, value];
                        } else {
                            return prev;
                        }
                    });
                });

                return () => unsubscribe();
            });
        }
    }, [user]);

    if (user.groups.length === 0) {
        return (
            <Section stylize="flex-1 justify-center items-center">
                <Type stylize="text-headlineMedium text-onSurfaceVariant text-center tracking-tight">Join a group to post.</Type>
                <Button type="filled" containerColor="bg-primary" contentColor="text-onPrimary" onPress={() => router.push('/community')} stylize="mt-4">Join a group</Button>
            </Section>
        );
    }

    return (
        <CustomKeyboardView>
            <Section stylize='px-7 mb-28 h-screen'>
                <Section stylize="pt-[74px]">
                    <Type weight='bold' stylize='text-displayMedium leading-[52px] tracking-tighter text-onSurface'>New</Type>
                    <Type weight='bold' stylize='text-displayMedium leading-[52px] tracking-tighter text-onSurface'>Post.</Type>
                </Section>

                <Select
                    data={groups}
                    value={selectGroup}
                    onChange={setSelectGroup}
                    placeholder="Choose group"
                    icon="language"
                    stylize="mt-6"
                />

                <Type stylize="text-titleLarge text-onSurface mt-6">Post</Type>
                <Section stylize={`flex-row justify-center align items-center w-full h-[200px] ${isFocused ? "border-2 border-primary" : "border border-onSurface"} rounded-[25px] overflow-hidden mt-3`}>
                    <TextInput
                        multiline
                        numberOfLines={10}
                        value={content}
                        onChangeText={(text) => setContent(text)}
                        placeholder="Write here..."
                        placeholderTextColor="#48454E"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        style={{ fontFamily: FontWeight['regular'], textAlignVertical: 'top' }} 
                        className="text-bodyLarge text-onSurface w-full h-[200px] py-6 px-6"
                    />
                </Section>
            </Section>

            {!keyboardVisible && (
                <Section stylize="absolute bottom-44">
                    <Section stylize="flex-row justify-between items-center w-full px-7">
                        <Button type="text" contentColor="text-primary" onPress={() => router.back()}>Cancel</Button>
                        <Fab family={Loading ? 'loading' : 'material'} icon="arrow-right-alt" type="large" containerColor="bg-primaryContainer" contentColor="onPrimaryContainer" onPress={handleNewPost} />
                    </Section>
                </Section>
            )}

            {snackbar && <Snackbar hasNav view={snackbar} message={error} action={() => setSnackbar(false)} stylize="mb-20" />}
        </CustomKeyboardView>
    );
}
 
export default NewPost;
