import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen, router } from 'expo-router';

import 'react-native-reanimated';
import 'react-native-gesture-handler';

import { AuthContextProvider, useAuth } from '@context';

const RootLayout = () => {
    const { user, isAuthenticated } = useAuth();

    useEffect(() => {
        if (typeof isAuthenticated == 'undefined') return;
        
        if (!isAuthenticated) {
            router.replace('/start');
        } else if (isAuthenticated && user && user.role === undefined) {
            router.replace('/assessments');
        } else if (isAuthenticated && user && user.role !== undefined) {
            router.replace('/home');
        }
    }, [isAuthenticated, user]);

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
