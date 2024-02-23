import { ScrollView } from 'react-native';
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
    const seeker = user.role === 'seeker';
    const helper = user.role === 'helper';

    const handleSignalClick = () => {
        if (user.signal) {
            router.push({
                pathname: '/chats/chatroom',
                params: { id: user.signalId, type: 'signal' }
            });
        } else {
            router.push('/chats/findSignal');
        }
    }

    const handleArchivedChatClick = (id: String) => {
        if (user.role === 'seeker') {
            router.push({
                pathname: '/chats/chatroom',
                params: { id, type: 'archived' }
            });
        } else {
            router.push({
                pathname: '/chats/chatroom',
                params: { id, type: 'signal' }
            });
        }
    }

    const signalText = seeker && user.signal ? 'Your Signal.' : 'Find Helper.';
    const helperText = helper && `Find \n Signals.`;

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Section stylize='mt-[74px] px-7'>
                <Type weight='bold' stylize='text-displayMedium leading-[52px] tracking-tighter text-onSurface'>Your</Type>
                <Type weight='bold' stylize='text-displayMedium leading-[52px] tracking-tighter text-onSurface'>Chats.</Type>

                <Section stylize='flex-row mt-7'>
                    <Section stylize='flex-1 flex-col justify-between bg-secondaryContainer rounded-b-[25px] rounded-tr-[25px] w-full h-[290px] py-3 pl-4 pr-2'>
                        <Type stylize={`text-displaySmall tracking-tighter ${seeker ? 'w-24' : 'w-28'} text-onSecondaryContainer`}>{seeker ? signalText : helperText}</Type>
                        <Fab type='regular' containerColor='bg-secondaryFixedDim' contentColor='onSecondaryContainer' icon='north-east' stylize='self-end' onPress={handleSignalClick} />
                    </Section>
                    <Section stylize='flex-1 flex-col justify-between bg-tertiaryContainer rounded-b-[25px] rounded-tl-[25px] w-full h-[290px] py-3 pl-4 pr-2 ml-1'>
                        <Type stylize='text-displaySmall tracking-tighter w-24 text-onTertiaryContainer'>Your Bot.</Type>
                        <Fab type='regular' containerColor='bg-tertiaryFixedDim' contentColor='onTertiaryContainer' icon='north-east' stylize='self-end' />
                    </Section>
                </Section>

                <Section stylize='bg-primaryFixed rounded-[50px] overflow-hidden w-full mt-7 mb-20 pt-7 pb-12'>
                    <Section stylize='flex-row justify-start w-full px-7'>
                        <Type stylize='text-headlineMedium text-onSurfaceVariant tracking-tight'>{seeker ? "Archived Chats" : "Signals"}</Type>
                    </Section>

                    <Section stylize='mt-5'>
                        {user.role === 'seeker' ? (
                            user.prevSignals && user.prevSignals.some(signal => signal.trim() !== '') ? (
                                user.prevSignals.map((signal, index) => (
                                    signal.trim() !== '' && <ArchivedChat key={index} name={signal} onPress={() => handleArchivedChatClick(signal)} stylize={index === 0 ? 'mt-0' : 'mt-1'} />
                                ))
                            ) : (
                                <Section stylize='flex justify-center items-center'>
                                    <Type stylize='text-headlineMedium text-primary tracking-tight text-center px-10 my-6'>No Previous signals found.</Type>
                                </Section>
                            )
                        ) : (
                            user.seekers && user.seekers.some(seeker => seeker.trim() !== '') ? (
                                user.seekers.map((seeker, index) => (
                                    seeker.trim() !== '' && <ArchivedChat key={index} name={seeker} onPress={() => handleArchivedChatClick(seeker)} stylize={index === 0 ? 'mt-0' : 'mt-1'} />
                                ))
                            ) : (
                                <Section stylize='flex justify-center items-center'>
                                    <Type stylize='text-headlineMedium text-primary tracking-tight text-center px-10 my-6'>No seekers found.</Type>
                                </Section>
                            )
                        )}
                    </Section>
                </Section>
            </Section>
        </ScrollView>
    );
}
 
export default Chats;
