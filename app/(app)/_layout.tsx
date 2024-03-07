import { useEffect } from 'react';
import { router, Tabs, useSegments } from 'expo-router';

import { useAuth } from '@context';
import { Nav } from '@components/material';

const AppLayout = () => {
    const { user, isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace('/start');
        } else if (user && !user.role) {
            router.replace('/assessments');
        }
    }, [isAuthenticated]);

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
            }}
            sceneContainerStyle={{
                backgroundColor: '#FDF8FF',
            }}
            tabBar={props => <Nav {...props} />}
        >
            <Tabs.Screen
                name='home'
            />
            <Tabs.Screen
                name='chats'
            />
            <Tabs.Screen
                name='community'
            />
            <Tabs.Screen
                name='profile'
            />
        </Tabs>
    );
}
 
export default AppLayout;
