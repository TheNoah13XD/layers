import { Stack } from 'expo-router';

const AuthLayout = () => {
    return (
        <Stack screenOptions={{ contentStyle: 
            { backgroundColor: '#FDF8FF'}
        }}>
            <Stack.Screen name='start' options={{ headerShown: false }} />
            <Stack.Screen name='signIn' options={{ headerShown: false }} />
            <Stack.Screen name='signUp' options={{ headerShown: false }}/>
        </Stack>
    );
}
 
export default AuthLayout;
