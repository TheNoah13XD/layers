import { Stack } from "expo-router";

const NewGroupLayout = () => {
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
        </Stack>
    )
}
 
export default NewGroupLayout;
