import { Stack } from "expo-router";

const CommunityLayout = () => {
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
                name="explore" 
            />
            <Stack.Screen 
                name="publicProfile"
            />
        </Stack>
    )
}
 
export default CommunityLayout;
