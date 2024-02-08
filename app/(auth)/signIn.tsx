import { useState } from 'react';
import { Pressable } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';

import { useAuth } from '@context';
import { Blurhash, GradientContainer } from '@constants';

import { CustomKeyboardView, Section, Type } from '@components/styled';
import { Button, Fab, Icon, Snackbar, TextField } from '@components/material';

const SignIn = () => {
    const { signin } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [snackbar, setSnackbar] = useState(false);
    const [error, setError] = useState('');

    const showError = (message: string) => {
        setError(message);
        setSnackbar(true);
        setTimeout(() => setSnackbar(false), 2000);
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
                default:
                    router.replace('/home');
            }
        }
    };

    return (
        <CustomKeyboardView>
            <Section stylize='w-full h-screen'>
                <Section stylize='px-[18px]'>
                    <Section stylize='pl-5 py-10 mt-[68px] rounded-[50px]'>
                        <Image
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                zIndex: -1
                            }}
                            source={GradientContainer}
                            placeholder={Blurhash}
                            contentFit="cover"
                        />
                        <Icon name='lock-open' size={57} color='black' />

                        <Section stylize='pl-2 pt-[132px]'>
                            <Type stylize='text-displayMedium tracking-tightest text-black'>Sign In</Type>
                            <Type stylize='text-titleSmall text-onSurface pt-2'>with your Layers Account or Google Account.</Type>
                        </Section>
                    </Section>

                    <Section stylize='px-5 pt-10'>
                        <TextField value={email} onChangeText={setEmail} icon='mail-outline' keyboardType='email-address' placeholder='Email'/>
                        <TextField value={password} onChangeText={setPassword} icon='lock-outline' secureTextEntry placeholder='Password' stylize='mt-2' />

                        <Type stylize='text-bodyLarge text-onSurface text-center mt-4'>or</Type>

                        <Pressable className='flex justify-center items-center bg-onSurface w-full h-14 mt-4 rounded-full'>
                            <Type stylize='text-inverseOnSurface text-bodyLarge'>Sign in with Google</Type>
                        </Pressable>
                    </Section>
                </Section>

                <Section stylize='flex flex-row items-center justify-between px-9 pt-11'>
                    <Button type='text' contentColor='text-primary' onPress={() => router.replace("/signUp")}>Create Account</Button>
                    <Fab icon='arrow-forward' type="large" containerColor='bg-primaryContainer' contentColor='onPrimaryContainer' onPress={handleSignIn} />
                </Section>

                <Snackbar view={snackbar} message={error} action={() => setSnackbar(false)} />
            </Section>
        </CustomKeyboardView>
    );
}
 
export default SignIn;
