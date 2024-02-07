import { useState } from 'react';
import { router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

import { Section, Type } from '../../components/ui/Stylize';
import CustomKeyboardView from '../../components/CustomKeyboardView';
import Icon from '../../components/ui/Icon';
import Button from '../../components/ui/Button';
import Fab from '../../components/ui/Fab';
import TextField from '../../components/ui/TextFiled';
import Snackbar from '../../components/ui/Snackbar';

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
                    <Section stylize='bg-primaryContainer pl-5 py-10 mt-[68px] rounded-[50px]'>
                        <Icon name='lock-open' size={57} color='black' />

                        <Section stylize='pl-2 pt-[132px]'>
                            <Type stylize='text-displayMedium tracking-tightest text-black'>Sign In</Type>
                            <Type stylize='text-titleSmall text-onSurface pt-2'>with your Layers Account or Google Account.</Type>
                        </Section>
                    </Section>

                    <Section stylize='px-5 pt-10'>
                        <TextField value={email} onChangeText={setEmail} icon='mail-outline' placeholder='Email'/>
                        <TextField value={password} onChangeText={setPassword} icon='lock-outline' secureTextEntry placeholder='Password' stylize='mt-2' />

                        <Type stylize='text-bodyLarge text-onSurface text-center mt-4'>or</Type>

                        {/* <TextField stylize='mt-4' /> */}
                    </Section>
                </Section>

                <Section stylize='flex flex-row items-center justify-between px-[38px] pt-11'>
                    <Button type='text' contentColor='text-primary' onPress={() => router.replace("/signUp")}>Create Account</Button>
                    <Fab icon='arrow-forward' type="large" containerColor='bg-primaryContainer' contentColor='onPrimaryContainer' onPress={handleSignIn} />
                </Section>

                <Snackbar view={snackbar} message={error} action={() => setSnackbar(false)} />
            </Section>
        </CustomKeyboardView>
    );
}
 
export default SignIn;
