import { ScrollView } from 'react-native';

import { Section, Type } from '@components/styled';
import { Fab, Icon } from '@components/material';

const Chats = () => {
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Section stylize='mt-[74px] px-7'>
                <Type weight='bold' stylize='text-displayMedium leading-[52px] tracking-tighter text-onSurface'>Your</Type>
                <Type weight='bold' stylize='text-displayMedium leading-[52px] tracking-tighter text-onSurface'>Chats.</Type>

                <Section stylize='flex-row mt-7'>
                    <Section stylize='flex-1 flex-col justify-between bg-secondaryContainer rounded-b-[25px] rounded-tr-[25px] w-full h-[290px] py-3 pl-4 pr-2'>
                        <Type stylize='text-displaySmall tracking-tighter w-24 text-onSecondaryContainer'>Your Signal.</Type>
                        <Fab type='regular' containerColor='bg-secondaryFixedDim' contentColor='onSecondaryContainer' icon='north-east' stylize='self-end' />
                    </Section>
                    <Section stylize='flex-1 flex-col justify-between bg-tertiaryContainer rounded-b-[25px] rounded-tl-[25px] w-full h-[290px] py-3 pl-4 pr-2 ml-1'>
                        <Type stylize='text-displaySmall tracking-tighter w-24 text-onTertiaryContainer'>Your Bot.</Type>
                        <Fab type='regular' containerColor='bg-tertiaryFixedDim' contentColor='onTertiaryContainer' icon='north-east' stylize='self-end' />
                    </Section>
                </Section>

                <Section stylize='bg-primaryFixed rounded-[50px] overflow-hidden w-full mt-7 mb-20 pt-7 pb-12'>
                    <Section stylize='flex-row justify-start w-full px-7'>
                        <Type stylize='text-headlineMedium text-onSurfaceVariant tracking-tight'>Archived Chats</Type>
                    </Section>

                <Section stylize='mt-5'>
                    <Section stylize='flex-row justify-between items-center bg-primaryFixedDim rounded-full mx-[6px] px-3 py-5'>
                        <Section stylize='flex-row items-center'>
                            <Section stylize='flex justify-center items-center bg-primaryContainer rounded-full w-10 h-10'>
                                <Icon family='materialCommunity' name='account-outline' color='primary' size={28} />
                            </Section>
                            <Type stylize='text-headlineSmall text-primary tracking-tight pl-2'>Signal Name</Type>
                        </Section>

                        <Fab icon='keyboard-arrow-right' type='small' containerColor='bg-primaryContainer' contentColor='primary' />
                    </Section>

                    <Section stylize='flex-row justify-between items-center bg-primaryFixedDim rounded-full mx-[6px] px-3 py-5 mt-1'>
                        <Section stylize='flex-row items-center'>
                            <Section stylize='flex justify-center items-center bg-primaryContainer rounded-full w-10 h-10'>
                                <Icon family='materialCommunity' name='account-outline' color='primary' size={28} />
                            </Section>
                            <Type stylize='text-headlineSmall text-primary tracking-tight pl-2'>Signal Name</Type>
                        </Section>

                        <Fab icon='keyboard-arrow-right' type='small' containerColor='bg-primaryContainer' contentColor='primary' />
                    </Section>

                    <Section stylize='flex-row justify-between items-center bg-primaryFixedDim rounded-full mx-[6px] px-3 py-5 mt-1'>
                        <Section stylize='flex-row items-center'>
                            <Section stylize='flex justify-center items-center bg-primaryContainer rounded-full w-10 h-10'>
                                <Icon family='materialCommunity' name='account-outline' color='primary' size={28} />
                            </Section>
                            <Type stylize='text-headlineSmall text-primary tracking-tight pl-2'>Signal Name</Type>
                        </Section>

                        <Fab icon='keyboard-arrow-right' type='small' containerColor='bg-primaryContainer' contentColor='primary' />
                    </Section>
                </Section>
                </Section>
            </Section>
        </ScrollView>
    );
}
 
export default Chats;
