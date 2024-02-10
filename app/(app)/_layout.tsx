import { useEffect } from 'react';
import { router, Tabs } from 'expo-router';

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
        <Tabs>
            <Tabs.Screen
                name='index'
                options={{ href: null }}
            />
            <Tabs.Screen
                name='home'
                options={{ headerShown: false }}
            />
            <Tabs.Screen
                name='chats'
                options={{ headerShown: false }}
            />
            <Tabs.Screen
                name='community'
                options={{ headerShown: false }}
            />
            <Tabs.Screen
                name='profile'
                options={{ headerShown: false }}
            />
        </Tabs>
    );
}
 
export default AppLayout;
