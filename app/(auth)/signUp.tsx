import { useEffect, useState } from 'react';
import { Pressable, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

import { useAuth } from '@context';

import { CustomKeyboardView, Section, Type } from '@components/styled';
import { Button, Check, Fab, Snackbar, TextField } from '@components/material';
import { Context, GoogelLogo } from '@components/pages/auth';

const SignUp = () => {
    const { user, isAuthenticated, isLoading, signup, promptAsync } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');

    const [completeProfile, setCompleteProfile] = useState(false);
    const [isChecked, setChecked] = useState(false);

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

    const handleSignUp = async() => {
        if (!completeProfile) {
            if (!name || !username) {
                showError('Please fill in all fields.');
            } else {
                setCompleteProfile(true);
            }
        } else {
            if (!email || !password) {
                showError('Please fill in all fields.');
            } else if (!isChecked) {
                showError('Please agree to terms & conditions.');
            } else {
                const response = await signup(email, password, name, username);
                switch (true) {
                    case response.toString().includes('already'):
                        showError('Email already in use.');
                        setCompleteProfile(false);
                        break;
                    case response.toString().includes('weak'):
                        showError('Password must be at least 6 characters.');
                        setCompleteProfile(false);
                        break;
                    case response.toString().includes('invalid'):
                        showError('Invalid email address.');
                        setCompleteProfile(false);
                        break;
                    case response.toString().includes('taken'):
                        showError('Username already in use.');
                        setCompleteProfile(false);
                        break;
                    default:
                        router.replace('/assessments');
                }
            }
        }
    };

    return (
        <CustomKeyboardView>
            <Section stylize='w-full h-full '>
                <Section stylize='px-[18px] mt-[68px]'>
                    <Context title='Sign Up' description='create a new Layers Account.' icon='how-to-reg' />

                    {!completeProfile ? (
                        <Section stylize='px-5 pt-10'>
                            <TextField key={1} value={name} onChangeText={setName} icon='face' placeholder='Full Name'/>
                            <TextField key={2} value={username} onChangeText={setUsername} icon='person' placeholder='Username' stylize='mt-2' />

                            <Type stylize='text-bodyLarge text-onSurface text-center mt-4'>or</Type>

                            <TouchableOpacity activeOpacity={0.7} className='flex-row justify-center items-center bg-onSurface w-full h-14 mt-4 rounded-full' onPress={() => promptAsync()}>
                                <GoogelLogo />
                                <Type stylize='text-inverseOnSurface text-[20px] pl-4'>Continue with Google</Type>
                            </TouchableOpacity>
                        </Section>
                    ) : (
                        <Section stylize='px-5 pt-[108px]'>
                            <TextField key={3} value={email} onChangeText={setEmail} icon='mail-outline' keyboardType='email-address' placeholder='Email' />
                            <TextField key={4} value={password} onChangeText={setPassword} icon='lock-outline' secureTextEntry placeholder='Password' stylize='mt-2' />

                            <Section stylize='flex-row items-center pt-10'>
                                <Check value={isChecked} onValueChange={setChecked} />
                                <Section stylize='flex-row'>
                                    <Pressable onPress={() => setChecked(!isChecked)}>
                                        <Type stylize='text-bodyLarge text-onPrimaryContainer pl-2'>Agree to</Type>
                                    </Pressable>
                                    <Pressable onPress={() => {router.push("/terms")}}>
                                        <Type stylize='text-bodyLarge text-onPrimaryContainer underline decoration-solid decoration-[#1C1149] pl-2'>terms & conditions.</Type>
                                    </Pressable>
                                </Section>
                            </Section>
                        </Section>
                    )}
                </Section>

                <Section stylize={`flex flex-row items-center justify-between pr-9 pl-5 ${!completeProfile ? 'pt-11' : 'pt-2'}`}>
                    <Button type='text' contentColor='text-primary' onPress={() => router.replace("/signIn")}>Sign In</Button>
                    <Fab family={family} icon='arrow-forward' type="large" containerColor='bg-primaryContainer' contentColor='primary' onPress={handleSignUp} />
                </Section>

                <Snackbar view={snackbar} message={error} action={() => setSnackbar(false)} />
            </Section>
        </CustomKeyboardView>
    );
}
 
export default SignUp;
