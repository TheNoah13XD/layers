import { Stack } from 'expo-router';

const AppLayout = () => {
    return (
        <Stack screenOptions={{ contentStyle: 
            { backgroundColor: '#FDF8FF'}
        }}>
            <Stack.Screen name='home' options={{ headerShown: false }} />
        </Stack>
    );
}
 
export default AppLayout;
