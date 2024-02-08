import { ImageBackground } from 'react-native';
import { router } from 'expo-router';

import { Gradient } from '@constants';

import { Section, Type } from '@components/styled';
import { Fab, Icon } from '@components/material';

const Start = () => {
    return (
        <ImageBackground source={Gradient} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Section stylize='flex-1 justify-end items-start px-8 pb-52'>
                
                <Icon name='lock-open' size={57} color='onSecondaryContainer' />

                <Section stylize='pt-5'>
                    <Type stylize='text-displayLarge tracking-tightest text-onSecondaryContainer'>.layers</Type>
                    <Type weight='medium' stylize='text-titleMedium tracking-wide text-onSecondaryContainer'>Unravel your layered feelings, punctuate your life with a comma.</Type>
                </Section>
                
                <Fab icon='arrow-forward' type="large" containerColor='bg-secondaryContainer' contentColor='onSecondaryContainer' stylize='absolute bottom-11 right-8' onPress={() => router.push("/signIn")} />
            </Section>
        </ImageBackground>
    );
}
 
export default Start;
