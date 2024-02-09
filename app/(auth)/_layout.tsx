import { useEffect } from 'react';
import { Stack, router } from 'expo-router';

import { useAuth } from '@context';

const AuthLayout = () => {
    const { user, isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated && user && user.role) {
            router.replace('/home');
        } else if (isAuthenticated && user && !user.role) {
            router.replace('/assessments');
        }
    }, [isAuthenticated]);

    return (
        <Stack screenOptions={{ contentStyle: 
            { backgroundColor: '#FDF8FF'}
        }}>
            <Stack.Screen
                name="start"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="signIn"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="signUp"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="assessments"
                options={{ headerShown: false }}
            />
        </Stack>
    );
}
 
export default AuthLayout;
