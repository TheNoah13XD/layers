import { ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

import { useAuth } from '@context';

import { Section, Type } from '@components/styled';
import { Fab } from '@components/material';
import { ArchivedChat } from '@components/pages/chats';

const Chats = () => {
    const { user } = useAuth();
    if (!user) {
        return null;
    }

    const handleSignalClick = () => {
        if (user.signal) {
            router.push('/chats/signal');
        } else {
            router.push('/chats/findSignal');
        }
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Section stylize='mt-[74px] px-7'>
                <Type weight='bold' stylize='text-displayMedium leading-[52px] tracking-tighter text-onSurface'>Your</Type>
                <Type weight='bold' stylize='text-displayMedium leading-[52px] tracking-tighter text-onSurface'>Chats.</Type>

                <Section stylize='flex-row mt-7'>
                    <Section stylize='flex-1 flex-col justify-between bg-secondaryContainer rounded-b-[25px] rounded-tr-[25px] w-full h-[290px] py-3 pl-4 pr-2'>
                        <Type stylize='text-displaySmall tracking-tighter w-24 text-onSecondaryContainer'>{user.signal ? 'Your Signal.' : 'Find Helper.'}</Type>
                        <Fab type='regular' containerColor='bg-secondaryFixedDim' contentColor='onSecondaryContainer' icon='north-east' stylize='self-end' onPress={handleSignalClick} />
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
                        <ArchivedChat name='Signal Name' />
                        <ArchivedChat name='Signal Name' stylize='mt-1' />
                        <ArchivedChat name='Signal Name' stylize='mt-1' />
                    </Section>
                </Section>
            </Section>
        </ScrollView>
    );
}
 
export default Chats;
