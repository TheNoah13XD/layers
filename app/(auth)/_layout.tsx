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
        <Stack screenOptions={{ 
            contentStyle: { backgroundColor: '#FDF8FF'},
            headerShown: false,
        }}>
            <Stack.Screen
                name="start"
            />
            <Stack.Screen
                name="signIn"
            />
            <Stack.Screen
                name="signUp"
            />
            <Stack.Screen
                name="assessments"
            />
        </Stack>
    );
}
 
export default AuthLayout;
