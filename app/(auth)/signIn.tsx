import { router } from 'expo-router';

import { Section, Type } from '../../components/ui/Stylize';
import CustomKeyboardView from '../../components/CustomKeyboardView';
import Icon from '../../components/ui/Icon';
import Button from '../../components/ui/Button';
import Fab from '../../components/ui/Fab';
import TextField from '../../components/ui/TextFiled';

const SignIn = () => {
    return (
        <CustomKeyboardView>
            <Section stylize='w-full h-full'>
                <Section stylize='px-[18px]'>
                    <Section stylize='bg-primaryContainer pl-5 py-10 mt-[68px] rounded-[50px]'>
                        <Icon name='lock-open' size={57} color='black' />

                        <Section stylize='pl-2 pt-[132px]'>
                            <Type stylize='text-displayMedium tracking-tightest text-black'>Sign In</Type>
                            <Type stylize='text-titleSmall text-onSurface pt-2'>with your Layers Account or Google Account.</Type>
                        </Section>
                    </Section>

                    <Section stylize='px-5 pt-10'>
                        <TextField icon='mail-outline' placeholder='Email'/>
                        <TextField icon='lock-outline' placeholder='Password' stylize='mt-2' />

                        <Type stylize='text-bodyLarge text-onSurface mt-4 text-center'>or</Type>

                        <TextField stylize='mt-4' />
                    </Section>
                </Section>

                <Section stylize='flex flex-row items-center justify-between px-[38px] pt-11'>
                    <Button type='text' contentColor='text-primary' onPress={() => router.replace("/signUp")}>Create Account</Button>
                    <Fab icon='arrow-forward' type="large" containerColor='bg-primaryContainer' contentColor='onPrimaryContainer' onPress={() => console.log("hehe")} />
                </Section>
            </Section>
        </CustomKeyboardView>
    );
}
 
export default SignIn;
