import { useEffect } from 'react';
import { router, Stack } from 'expo-router';

import { useAuth } from '@context';

const AppLayout = () => {
    const { user, isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace('/start');
        } else if (user && user && !user.role) {
            router.replace('/assessments');
        }
    }, [isAuthenticated]);

    return (
        <Stack screenOptions={{ contentStyle: 
            { backgroundColor: '#FDF8FF'}
        }}>
            <Stack.Screen name='home' options={{ headerShown: false }} />
        </Stack>
    );
}
 
export default AppLayout;
