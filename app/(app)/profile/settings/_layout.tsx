import { Stack } from "expo-router";

const SettingsLayout = () => {
    return (
        <Stack screenOptions={{ 
            contentStyle: { backgroundColor: '#FDF8FF'},
            headerShown: false,
        }}>
            <Stack.Screen 
                name="index" 
            />
        </Stack>
    );
}
 
export default SettingsLayout;
