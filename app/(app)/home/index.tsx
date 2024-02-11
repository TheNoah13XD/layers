import { useState } from 'react';
import { ScrollView } from 'react-native';

import { useAuth } from '@context';

import { Section, Type } from '@components/styled';
import { Button, ButtonProps, Icon } from '@components/material';

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
                <Type weight='bold' stylize='text-displayMedium leading-[52px] text-onSurface'>Hi,</Type>
                <Type weight='bold' stylize='text-displayMedium leading-[52px] text-onSurface'>{firstName}!</Type>

                <Section stylize='flex-row mt-7'>
                    <Button {...getButtonProps(active === 'index')} onPress={() => setActive('index')}>Layer Index</Button>
                    <Button {...getButtonProps(active === 'feels')} onPress={() => setActive('feels')} stylize='ml-1'>Feels</Button>
                    <Button type='filled' containerColor='bg-error' contentColor='text-onError' stylize='ml-1'>Emergency</Button>
                </Section>

                <Section stylize='flex-row items-center mt-7'>
                    <Section stylize='justify-center items-center rounded-[50px] bg-primaryFixed w-[220px] h-[220px]'>
                        <Type stylize='text-[91px] text-primary'>{active === "index" ? "82" : ": )"}</Type>
                    </Section>
                    <Section stylize='flex-col pl-4'>
                        <Type weight='medium' stylize='text-titleMedium text-onPrimaryContainer w-[120px]'>{active === "index" ? "Embrace positive journey." : "I'm feeling positive!"}</Type>
                        <Section stylize='border-b border-outlineVariant mt-3' children />
                        <Button type='filled' icon={active === "index" ? "arrow-right-alt" : "add"} containerColor='bg-primary' contentColor='text-onPrimary' stylize='mt-3'>{active === "index" ? "History" : "Swing"}</Button>
                    </Section>
                </Section>

                <Section stylize='bg-primaryFixed rounded-[50px] overflow-hidden w-full mt-7 mb-20 pt-7 pb-12'>
                    <Section stylize='flex-row justify-between items-center w-full px-7'>
                        <Type stylize='text-headlineMedium text-onSurfaceVariant tracking-tight'>Therapy</Type>
                        <Button type='filled' icon='bookmark-outline' containerColor='bg-primaryFixedDim' contentColor='text-onPrimaryFixedVariant' stylize='mt-3'>Logs</Button>
                    </Section>

                    <Section stylize='px-[6px] py-5'>
                        <Section stylize='flex-col bg-primaryFixedDim rounded-[25px] p-4'>
                            <Type stylize='text-titleLarge tracking-tight w-64 text-black'>You have already started today's journal.</Type>
                            <Section stylize='flex-row justify-between items-center w-full mt-12'>
                                <Type stylize='text-titleLarge text-onPrimaryFixed tracking-tight'>20/01/24</Type>
                                <Section stylize='flex-row'>
                                    <Icon name='edit' color='onPrimary' size={16} stylize='flex justify-center items-center bg-primary rounded-full w-7 h-7'/>
                                    <Icon name='mic' color='onPrimary' size={16} stylize='flex justify-center items-center bg-primary rounded-full w-7 h-7 ml-2'/>
                                </Section>
                            </Section>
                        </Section>

                        <Section stylize='flex-col justify-between bg-primaryFixedDim rounded-[25px] p-4 mt-1'>
                            <Type stylize='text-titleLarge tracking-tight w-64 text-black'>Activities that might interest you for this weekend.</Type>
                            <Section stylize='flex-row justify-end w-full mt-12'>
                                <Button type='filled' icon='arrow-right-alt' containerColor='bg-primary' contentColor='text-onPrimary'>View</Button>
                            </Section>
                        </Section>
                    </Section>

                    <Section stylize='flex-row justify-between items-center w-full px-7'>
                        <Type stylize='text-headlineMedium text-onSurfaceVariant tracking-tight'>Recess Groups</Type>
                        <Button type='filled' icon='language' containerColor='bg-primaryFixedDim' contentColor='text-onPrimaryFixedVariant' stylize='mt-3'>More</Button>
                    </Section>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <Section stylize='flex-row px-[6px] pt-5'>
                            <Section stylize='flex-col bg-primaryFixedDim rounded-[25px] w-[260px] p-4'>
                                <Section stylize='flex-row items-center'>
                                    <Icon name='diversity-1' color='onPrimary' stylize='flex justify-center items-center bg-primary rounded-full w-10 h-10' />
                                    <Type stylize='text-headlineSmall text-primary tracking-tight ml-2'>54</Type>
                                </Section>
                                <Section stylize='flex-row justify-between items-center w-full mt-[108px]'>
                                    <Type stylize='text-headlineLarge tracking-tight text-onPrimaryContainer'>Recoverly</Type>
                                    <Icon name='north-east' color='onPrimaryContainer' size={32}></Icon>
                                </Section>
                            </Section>

                            <Section stylize='flex-col bg-primaryFixedDim rounded-[25px] w-[260px] p-4 ml-1'>
                                <Section stylize='flex-row items-center'>
                                    <Icon name='diversity-1' color='onPrimary' stylize='flex justify-center items-center bg-primary rounded-full w-10 h-10' />
                                    <Type stylize='text-headlineSmall text-primary tracking-tight ml-2'>54</Type>
                                </Section>
                                <Section stylize='flex-row justify-between items-center w-full mt-[108px]'>
                                    <Type stylize='text-headlineLarge tracking-tight text-onPrimaryContainer'>Recoverly</Type>
                                    <Icon name='north-east' color='onPrimaryContainer' size={32}></Icon>
                                </Section>
                            </Section>
                        </Section>
                    </ScrollView>
                </Section>
            </Section>
        </ScrollView>
    );
}
 
export default Home;
