import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Slot, router, useSegments } from 'expo-router';

import { AuthContextProvider, useAuth } from '@context';

const RootLayout = () => {
    const {isAuthenticated} = useAuth();
    const segments = useSegments();

    useEffect(() => {
        if (typeof isAuthenticated == 'undefined') return;
        const inApp = segments[0] == 'app';
        
        if (isAuthenticated && !inApp) {
            router.replace('/home')
        } else if (!isAuthenticated) {
            router.replace('/start')
        }
    }, [isAuthenticated]);

    return <Slot />
}

export default function App() {
    const [fontsLoaded, fontError] = useFonts({
        'ProductSansRegular': require('../assets/fonts/ProductSansRegular.ttf'),
        'ProductSansMedium': require('../assets/fonts/ProductSansMedium.ttf'),
        'ProductSansBold': require('../assets/fonts/ProductSansBold.ttf'),
    });

    if (!fontsLoaded && !fontError) {
        return  null;
    }

    return (
        <AuthContextProvider>
            <RootLayout />
        </AuthContextProvider>
    )
}
