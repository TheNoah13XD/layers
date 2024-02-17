import { Stack } from "expo-router";

const ExploreLayout = () => {
    return (
        <Stack screenOptions={{ 
            contentStyle: { backgroundColor: '#FDF8FF'},
            headerShown: false,
        }}>
            <Stack.Screen 
                name="index" 
            />
            <Stack.Screen 
                name="[id]" 
            />
        </Stack>
    );
}
 
export default ExploreLayout;
