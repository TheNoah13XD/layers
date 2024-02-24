import { Stack } from "expo-router";

const ProfileLayout = () => {
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
                name="settings"
            />
        </Stack>
    );
}
 
export default ProfileLayout;
