import { Redirect, Stack } from 'expo-router';

import { useAuth } from '@context';

const AppLayout = () => {
    const {isAuthenticated} = useAuth();

    if (!isAuthenticated) {
        return <Redirect href={'/start'} />;
    }

    return (
        <Stack screenOptions={{ contentStyle: 
            { backgroundColor: '#FDF8FF'}
        }}>
            <Stack.Screen name='home' options={{ headerShown: false }} />
        </Stack>
    );
}
 
export default AppLayout;
