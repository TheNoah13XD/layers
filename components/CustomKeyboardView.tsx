import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

interface CustomKeyboardViewProps {
    children: React.ReactNode;
}

const ios = Platform.OS === "ios";

const CustomKeyboardView = ({ children }: CustomKeyboardViewProps) => {
    return (
        <KeyboardAvoidingView behavior={ios ? 'padding' : 'height'} style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }} bounces={false} showsVerticalScrollIndicator={false}>
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
 
export default CustomKeyboardView;
