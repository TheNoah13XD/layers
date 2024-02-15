import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen, router, useSegments } from 'expo-router';

import { AuthContextProvider, useAuth } from '@context';

const RootLayout = () => {
    const { user, isLoading, isAuthenticated } = useAuth();
    const segments = useSegments();

    useEffect(() => {
        if (typeof isAuthenticated == 'undefined' || isLoading) return;
        const inApp = segments[0] == 'app';
        
        if (isAuthenticated && !inApp && user?.role) {
            router.replace('/home');
        } else if (isAuthenticated && user && !user.role) {
            router.replace('/assessments');
        } else if (!isAuthenticated) {
            router.replace('/start');
        }
    }, [isAuthenticated, isLoading]);

    return <Slot />
}

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [fontsLoaded, fontError] = useFonts({
        'ProductSansRegular': require('../assets/fonts/ProductSansRegular.ttf'),
        'ProductSansMedium': require('../assets/fonts/ProductSansMedium.ttf'),
        'ProductSansBold': require('../assets/fonts/ProductSansBold.ttf'),
    });

    useEffect(() => {
        if (fontError) throw new Error('Failed to load fonts');
    }, [fontError]);
    
    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);
    
    if (!fontsLoaded) {
        return null;
    }

    return (
        <AuthContextProvider>
            <RootLayout />
        </AuthContextProvider>
    );
}
