import { Stack } from "expo-router";

const JournalLayout = () => {
    return (
        <Stack screenOptions={{ 
            contentStyle: { backgroundColor: '#FDF8FF'},
            headerShown: false,
        }}>
            <Stack.Screen
                name="[id]"
            />
        </Stack>
    );
}
 
export default JournalLayout;
