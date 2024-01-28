import { useFonts } from 'expo-font';

import Index from './index';

export default function App() {
    const [fontsLoaded, fontError] = useFonts({
        'ProductSansRegular': require('../assets/fonts/ProductSansRegular.ttf'),
        'ProductSansMedium': require('../assets/fonts/ProductSansMedium.ttf'),
        'ProductSansBold': require('../assets/fonts/ProductSansBold.ttf'),
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <Index />
    )
}
