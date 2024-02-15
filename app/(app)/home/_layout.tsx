import { Stack } from "expo-router";

const HomeLayout = () => {
    return (
        <Stack screenOptions={{ 
            contentStyle: { backgroundColor: '#FDF8FF'},
            headerShown: false,
        }}>
            <Stack.Screen 
                name="index" 
            />
            <Stack.Screen 
                name="emergency/index" 
            />
        </Stack>
    )
}
 
export default HomeLayout;
