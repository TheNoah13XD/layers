import { useState } from 'react';
import { Pressable } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

import { Blurhash, GradientContainer } from '../../constants';
import { Section, Type } from '../../components/ui/Stylize';
import CustomKeyboardView from '../../components/CustomKeyboardView';
import Icon from '../../components/ui/Icon';
import Button from '../../components/ui/Button';
import Fab from '../../components/ui/Fab';
import TextField from '../../components/ui/TextFiled';
import Snackbar from '../../components/ui/Snackbar';
import Check from '../../components/ui/Check';

const SignUp = () => {
    const { signup } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');

    const [completeProfile, setCompleteProfile] = useState(false);
    const [isChecked, setChecked] = useState(false);

    const [snackbar, setSnackbar] = useState(false);
    const [error, setError] = useState('');

    const showError = (message: string) => {
        setError(message);
        setSnackbar(true);
        setTimeout(() => setSnackbar(false), 2000);
    };

    const handleSignUp = async() => {
        if (!completeProfile) {
            if (!email || !password) {
                showError('Please fill in all fields.');
            } else {
                setCompleteProfile(true);
            }
        } else {
            if (!name || !username) {
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
                    default:
                        router.replace('/home');
                }
            }
        }
    };

    return (
        <CustomKeyboardView>
            <Section stylize='w-full h-full '>
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
                            <Type stylize='text-displayMedium tracking-tightest text-black'>Sign Up</Type>
                            <Type stylize='text-titleSmall text-onSurface pt-2'>create a new Layers Account.</Type>
                        </Section>
                    </Section>

                    {!completeProfile ? (
                        <Section stylize='px-5 pt-10'>
                            <TextField value={email} onChangeText={setEmail} icon='mail-outline' placeholder='Email'/>
                            <TextField value={password} onChangeText={setPassword} icon='lock-outline' secureTextEntry placeholder='Password' stylize='mt-2' />

                            <Type stylize='text-bodyLarge text-onSurface text-center mt-4'>or</Type>

                            <Pressable className='flex justify-center items-center bg-onSurface w-full h-14 mt-4 rounded-full'>
                                <Type stylize='text-inverseOnSurface text-bodyLarge'>Continue with Google</Type>
                            </Pressable>
                        </Section>
                    ) : (
                        <Section stylize='px-5 pt-[108px]'>
                            <TextField value={name} onChangeText={setName} icon='face' placeholder='Full Name'/>
                            <TextField value={username} onChangeText={setUsername} icon='person' placeholder='Username' stylize='mt-2' />

                            <Section stylize='flex-row items-center pl-4 pt-10'>
                                <Check value={isChecked} onValueChange={setChecked} />
                                <Type stylize='text-bodyLarge text-onSurface pl-2'>Agree to terms & conditions.</Type>
                            </Section>
                        </Section>
                    )}
                </Section>

                <Section stylize={`flex flex-row items-center justify-between px-9 ${!completeProfile ? 'pt-11' : 'pt-2'}`}>
                    <Button type='text' contentColor='text-primary' onPress={() => router.replace("/signIn")}>Sign In</Button>
                    <Fab icon='arrow-forward' type="large" containerColor='bg-primaryContainer' contentColor='onPrimaryContainer' onPress={handleSignUp} />
                </Section>

                <Snackbar view={snackbar} message={error} action={() => setSnackbar(false)} />
            </Section>
        </CustomKeyboardView>
    );
}
 
export default SignUp;
