import { useEffect } from 'react';
import { Stack, router } from 'expo-router';

import { useAuth } from '@context';

const AssessmentsLayout = () => {
    const { assessment, isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated && assessment) {
            router.replace('/home')
        } else if (!isAuthenticated) {
            router.replace('/start')
        }
    }, [isAuthenticated]);

    return (
        <Stack screenOptions={{ contentStyle: 
            { backgroundColor: '#FDF8FF'}
        }}>
            <Stack.Screen
                name="index"
                options={{ headerShown: false }}
            />
        </Stack>
    );
}
 
export default AssessmentsLayout;
