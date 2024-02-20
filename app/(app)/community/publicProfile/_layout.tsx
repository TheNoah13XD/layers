import { Stack } from "expo-router";

const publicProfileLayout = () => {
    return (
        <Stack screenOptions={{ 
            contentStyle: { backgroundColor: '#FDF8FF'},
            headerShown: false,
        }}>
            <Stack.Screen 
                name="[id]" 
            />
        </Stack>
    )
}
 
export default publicProfileLayout;
