import { useState } from 'react';
import { ScrollView } from 'react-native';

import { useAuth } from '@context';

import { Section, Type } from '@components/styled';
import { Button, ButtonProps } from '@components/material';
import { FeelsLog, GroupCard, JournalStatus, LayerIndex, ViewActivities } from '@components/pages/dashboard';

const Home = () => {
    const { user } = useAuth();

    const [active, setActive] = useState<'index' | 'feels'>('index');

    const name = user?.name.split(' ');
    const firstName = name ? name[0] : '';

    const getButtonProps = (isActive: boolean): ButtonProps => ({
        type: isActive ? "filled" : "outlined",
        icon: isActive ? "layers" : undefined,
        containerColor: isActive ? "bg-primary" : undefined,
        contentColor: isActive ? "text-onPrimary" : 'text-primary',
        onPress: () => {},
        children: '',
    });

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Section stylize='pt-[74px] px-7'>
                <Type weight='bold' stylize='text-displayMedium leading-[52px] tracking-tighter text-onSurface'>Hi,</Type>
                <Type weight='bold' stylize='text-displayMedium leading-[52px] tracking-tighter text-onSurface'>{firstName}!</Type>

                <Section stylize='flex-row mt-7'>
                    <Button {...getButtonProps(active === 'index')} onPress={() => setActive('index')}>Layer Index</Button>
                    <Button {...getButtonProps(active === 'feels')} onPress={() => setActive('feels')} stylize='ml-1'>Feels</Button>
                    <Button type='filled' containerColor='bg-error' contentColor='text-onError' stylize='ml-1'>Emergency</Button>
                </Section>

                {active === 'index' ? (
                    <LayerIndex score={82} quote='Embrace positive journey.' stylize='mt-7' />
                ) : (
                    <FeelsLog feel=': )' quote="I'm feeling positive!" stylize='mt-7' />
                )}

                <Section stylize='bg-primaryFixed rounded-[50px] overflow-hidden w-full mt-7 mb-20 pt-7 pb-12'>
                    <Section stylize='flex-row justify-between items-center w-full px-7'>
                        <Type stylize='text-headlineMedium text-onSurfaceVariant tracking-tight'>Therapy</Type>
                        <Button type='filled' icon='bookmark-outline' containerColor='bg-primaryFixedDim' contentColor='text-onPrimaryFixedVariant'>Logs</Button>
                    </Section>

                    <Section stylize='px-[6px] py-5'>
                        <JournalStatus status='started' />
                        <ViewActivities stylize='mt-1' />
                    </Section>

                    <Section stylize='flex-row justify-between items-center w-full px-7'>
                        <Type stylize='text-headlineMedium text-onSurfaceVariant tracking-tight'>Recess Groups</Type>
                        <Button type='filled' icon='language' containerColor='bg-primaryFixedDim' contentColor='text-onPrimaryFixedVariant' stylize='mt-3'>More</Button>
                    </Section>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <Section stylize='flex-row px-[6px] pt-5'>
                            <GroupCard name='Recoverly' members={54} />
                            <GroupCard name='Forward' members={69} stylize='ml-1' />
                        </Section>
                    </ScrollView>
                </Section>
            </Section>
        </ScrollView>
    );
}
 
export default Home;
