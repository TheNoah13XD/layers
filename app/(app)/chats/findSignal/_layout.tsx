import { Stack } from "expo-router";

const FindLayout = () => {
    return (
        <Stack screenOptions={{ 
            contentStyle: { backgroundColor: '#FDF8FF'},
            headerShown: false,
        }}>
            <Stack.Screen
                name="index"
            />
            <Stack.Screen
                name="viewRequests"
            />
        </Stack>
    );
}
 
export default FindLayout;
