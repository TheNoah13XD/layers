import { Stack } from "expo-router";

const CommunityLayout = () => {
    return (
        <Stack screenOptions={{ 
            contentStyle: { backgroundColor: '#FDF8FF'},
            headerShown: false,
        }}>
            <Stack.Screen 
                name="index" 
            />
            <Stack.Screen 
                name="explore" 
            />
        </Stack>
    )
}
 
export default CommunityLayout;
