import { useState } from 'react';
import { ScrollView } from 'react-native';
import { router } from 'expo-router';

import { useAuth } from '@context';

import { Section, Type } from '@components/styled';
import { Button, ButtonProps, Snackbar } from '@components/material';
import { AssessSignals, FeelsLog, JournalStatus, LayerIndex, Recommend, ViewActivities } from '@components/pages/dashboard';

const Home = () => {
    const { user } = useAuth();
    if (!user) {
        return null;
    }

    const [active, setActive] = useState<'index' | 'feels'>('index');
    const role = user.role;

    const name = user.name.split(' ');
    const firstName = name ? name[0] : '';

    const [snackbar, setSnackbar] = useState(false);
    const [error, setError] = useState('');

    const showError = (message: string) => {
        setError(message);
        setSnackbar(true);
        setTimeout(() => setSnackbar(false), 2000);
    };

    const handleSwingClick = () => {
        console.log('Swing clicked');
        showError('This feature is not available yet');
    };

    const getButtonProps = (isActive: boolean): ButtonProps => ({
        type: isActive ? "filled" : "outlined",
        icon: isActive ? "layers" : undefined,
        containerColor: isActive && role === 'seeker' ? "bg-primary" : isActive && role === 'helper' ? "bg-secondary" : undefined,
        contentColor: isActive && role === 'seeker' ? "text-onPrimary" : isActive && role === 'helper' ? "text-onSecondary" : 'text-primary',
        onPress: () => {},
        children: '',
    });

    return (
        <>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Section stylize='pt-[74px] px-7'>
                    <Type weight='bold' stylize='text-displayMedium leading-[52px] tracking-tighter text-onSurface'>Hi,</Type>
                    <Type weight='bold' stylize='text-displayMedium leading-[52px] tracking-tighter text-onSurface'>{firstName}!</Type>

                    <Section stylize='flex-row mt-7'>
                        <Button {...getButtonProps(active === 'index')} onPress={() => setActive('index')}>Layer Index</Button>
                        {user.role === 'seeker' && <Button {...getButtonProps(active === 'feels')} onPress={() => setActive('feels')} stylize='ml-1'>Feels</Button>}
                        <Button type='filled' containerColor='bg-error' contentColor='text-onError' stylize='ml-1' onPress={() => router.push('/home/emergency')}>Emergency</Button>
                    </Section>

                    {active === 'index' ? (
                        <LayerIndex role={role!} score={user.score!} stylize='mt-7' />
                    ) : (
                        <FeelsLog feel=': )' stylize='mt-7' onPress={handleSwingClick} />
                    )}

                    <Section stylize={`${role === 'seeker' ? "bg-primaryFixed" : "bg-secondaryFixed"} rounded-[50px] overflow-hidden w-full mt-7 mb-20 pt-7 pb-12`}>
                        <Section stylize='flex-row justify-between items-center w-full px-7'>
                            <Type stylize='text-headlineMedium text-onSurfaceVariant tracking-tight'>Therapy</Type>
                            <Button type='filled' icon='bookmark-outline' containerColor={role === 'seeker' ? "bg-primaryFixedDim" : "bg-secondaryFixedDim"} contentColor={role === "seeker" ? "text-onPrimaryFixedVariant" : "text-onSecondaryFixedVariant"} onPress={() => router.push('/home/records/journalHistory')}>Logs</Button>
                        </Section>

                        <Section stylize='px-[6px] py-5'>
                            <JournalStatus user={user} />
                            <ViewActivities role={user.role!} stylize='mt-1' />
                        </Section>
                        {user.role === 'helper' && user.seekers && user.seekers.some(seeker => seeker.trim() !== '') && (
                            <>
                                <Section stylize='flex-row justify-between items-center w-full px-7'>
                                    <Type stylize='text-headlineMedium text-onSurfaceVariant tracking-tight'>Assess Signals</Type>
                                    <Button type='filled' icon='keyboard-arrow-right' containerColor={role === 'seeker' ? "bg-primaryFixedDim" : "bg-secondaryFixedDim"} contentColor={role === "seeker" ? "text-onPrimaryFixedVariant" : "text-onSecondaryFixedVariant"} stylize='mt-3' onPress={() => router.push('/chats')}>More</Button>
                                </Section>

                                <AssessSignals user={user} />
                            </>
                        )}

                        <Section stylize={`flex-row justify-between items-center w-full px-7 ${user.role === 'helper' ? 'mt-5' : ''}`}>
                            <Type stylize='text-headlineMedium text-onSurfaceVariant tracking-tight'>Recess Groups</Type>
                            <Button type='filled' icon='language' containerColor={role === 'seeker' ? "bg-primaryFixedDim" : "bg-secondaryFixedDim"} contentColor={role === "seeker" ? "text-onPrimaryFixedVariant" : "text-onSecondaryFixedVariant"} stylize='mt-3' onPress={() => router.push('/community/explore')}>More</Button>
                        </Section>

                        <Recommend user={user} />
                    </Section>
                </Section>
            </ScrollView>

            {snackbar && <Snackbar hasNav view={snackbar} message={error} action={() => setSnackbar(false)} />}
        </>
    );
}
 
export default Home;
