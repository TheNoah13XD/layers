import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

interface CustomKeyboardViewProps {
    children: React.ReactNode;
}

const ios = Platform.OS === "ios";

export const CustomKeyboardView = ({ children }: CustomKeyboardViewProps) => {
    return (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={ios ? 10 : 0} style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }} bounces={false} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always'>
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
