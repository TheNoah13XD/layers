import { Header } from '@components/material/Header';
import { Stack } from 'expo-router';

const AuthLayout = () => {
    return (
        <Stack 
            screenOptions={{ 
                contentStyle: { backgroundColor: '#FDF8FF'},
                headerShown: false,
            }}
            initialRouteName='start'
        >
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
                name="terms"
                options={{
                    headerShown: true,
                    header: () => <Header title='Terms & Conditions' />
                }}
            />
            <Stack.Screen
                name="assessments"
            />
        </Stack>
    );
}
 
export default AuthLayout;
