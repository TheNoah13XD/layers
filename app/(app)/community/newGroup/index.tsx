import { useEffect, useState } from "react";
import { Keyboard, TextInput } from "react-native";
import { router } from "expo-router";

import { createGroup } from "utils/firebase";
import { FontWeight } from "@constants";
import { useAuth } from "@context";

import { CustomKeyboardView, Section, Type } from "@components/styled";
import { Button, Fab, Select, Snackbar, TextField } from "@components/material";

const NewGroup = () => {
    const { user } = useAuth();
    if (!user || user.role !== "helper") {
        return null;
    }

    const categories = [
        { label: 'Smoking', value: 'smoking' },
        { label: 'Drinking', value: 'drinking' },
        { label: 'Substance', value: 'substance' },
        { label: 'porn', value:'porn' },
        { label: 'Gambling', value: 'gambling' },
        { label: 'Depression', value: 'depression' },
        { label: 'Suicidal', value: 'suicidal' },
        { label: 'Selfharm', value: 'selfharm' }
    ];

    const [Loading, setLoading] = useState(false);
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [selectCategory, setSelectCategory] = useState<any>([]);

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

    const handleCreateGroup = async () => {
        if (name && description && selectCategory.length > 0) {
            setLoading(true);
            const response = await createGroup(user.id, user.username, name, description, selectCategory);
            if (response === "Already exists") {
                showError("Group name already exists");
                setLoading(false);
            } else {
                router.push(`/community/explore/${response.groupId}`)
            }
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

    return (
        <CustomKeyboardView>
            <Section stylize='px-7 mb-28 h-screen'>
                <Section stylize="pt-[74px]">
                    <Type weight='bold' stylize='text-displayMedium leading-[52px] tracking-tighter text-onSurface'>New</Type>
                    <Type weight='bold' stylize='text-displayMedium leading-[52px] tracking-tighter text-onSurface'>Group.</Type>
                </Section>

                <Select
                    multi
                    data={categories}
                    value={selectCategory}
                    onChange={setSelectCategory}
                    placeholder="Choose Categories"
                    icon="language"
                    stylize="mt-6"
                />

                <Type stylize="text-titleLarge text-onSurface mt-6">Name</Type>
                <TextField
                    value={name}
                    maxLength={30}
                    onChangeText={(text) => setName(text)}
                    placeholder="Unique Name"
                    icon="diversity-1"
                    stylize="mt-3"
                />

                <Type stylize="text-titleLarge text-onSurface mt-6">Description</Type>
                <Section stylize={`flex-row justify-center align items-center w-full h-[200px] ${isFocused ? "border-2 border-primary" : "border border-onSurface"} rounded-[25px] overflow-hidden mt-3`}>
                    <TextInput
                        multiline
                        numberOfLines={10}
                        maxLength={120}
                        value={description}
                        onChangeText={(text) => setDescription(text)}
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
                        <Fab family={Loading ? 'loading' : 'material'} icon="arrow-right-alt" type="large" containerColor="bg-primaryContainer" contentColor="onPrimaryContainer" onPress={handleCreateGroup} />
                    </Section>
                </Section>
            )}

            {snackbar && <Snackbar hasNav view={snackbar} message={error} action={() => setSnackbar(false)} stylize="mb-20" />}
        </CustomKeyboardView>
    );
}
 
export default NewGroup;
