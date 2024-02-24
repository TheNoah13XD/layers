import { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import { router } from 'expo-router';

import { useAuth } from '@context';

import { CustomKeyboardView, Section, Type } from '@components/styled';
import { Button, Fab, Snackbar, TextField } from '@components/material';
import { Context } from '@components/pages/auth';

const SignIn = () => {
    const { user, isAuthenticated, isLoading, signin } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [snackbar, setSnackbar] = useState(false);
    const [error, setError] = useState('');

    const family = isLoading ? 'loading' : 'material';

    useEffect(() => {
        if (isAuthenticated && user && user.role) {
            router.replace('/home');
        } else if (isAuthenticated && user && !user.role) {
            router.replace('/assessments');
        }
    }, [isAuthenticated]);

    const showError = (message: string) => {
        setError(message);
        setSnackbar(true);
        setTimeout(() => setSnackbar(false), 2000);
    };

    const handleGoogleSignIn = () => {
        showError('This feature is not available yet.');
    };

    const handleSignIn = async() => {
        if (!email || !password) {
            setError('Please fill in all fields.');
            setSnackbar(true);
            setTimeout(() => setSnackbar(false), 2000);
        } else {
            const response = await signin(email, password);
            switch (true) {
                case response.toString().includes('email'):
                    showError('Invalid email address.');
                    break;
                case response.toString().includes('credential'):
                    showError('Incorrect password.');
                    break;
                case user && !user.role:
                    router.replace('/assessments');
                    break;
                default:
                    router.replace('/home');
            }
        }
    };

    return (
        <CustomKeyboardView>
            <Section stylize='w-full h-screen'>
                <Section stylize='px-[18px] mt-[68px]'>
                    <Context title='Sign In' description='with your Layers Account or Google Account.' icon='lock-open' />

                    <Section stylize='px-5 pt-10'>
                        <TextField value={email} onChangeText={setEmail} icon='mail-outline' keyboardType='email-address' placeholder='Email'/>
                        <TextField value={password} onChangeText={setPassword} icon='lock-outline' secureTextEntry placeholder='Password' stylize='mt-2' />

                        <Type stylize='text-bodyLarge text-onSurface text-center mt-4'>or</Type>

                        <Pressable className='flex justify-center items-center bg-onSurface w-full h-14 mt-4 rounded-full' onPress={handleGoogleSignIn}>
                            <Type stylize='text-inverseOnSurface text-bodyLarge'>Sign in with Google</Type>
                        </Pressable>
                    </Section>
                </Section>

                <Section stylize='flex flex-row items-center justify-between px-9 pt-11'>
                    <Button type='text' contentColor='text-primary' onPress={() => router.replace("/signUp")}>Create Account</Button>
                    <Fab icon="arrow-forward" family={family} type="large" containerColor='bg-primaryContainer' contentColor='primary' onPress={handleSignIn} />
                </Section>

                {snackbar && <Snackbar view={snackbar} message={error} action={() => setSnackbar(false)} />}
            </Section>
        </CustomKeyboardView>
    );
}
 
export default SignIn;
