import { Stack } from "expo-router";

const HomeLayout = () => {
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
                name="emergency" 
            />
            <Stack.Screen 
                name="records"
            />
            <Stack.Screen 
                name="activities"
            />
        </Stack>
    );
}
 
export default HomeLayout;
