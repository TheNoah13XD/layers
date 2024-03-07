import { Stack } from "expo-router";

const ChatsLayout = () => {
    return (
        <Stack 
            screenOptions={{ 
                contentStyle: { backgroundColor: '#FDF8FF'},
                headerShown: false,
            }}
            initialRouteName="index"
        >
            <Stack.Screen
                name="index"
            />
            <Stack.Screen
                name="findSignal"
            />
            <Stack.Screen
                name="chatroom"
            />
        </Stack>
    )
}
 
export default ChatsLayout;
