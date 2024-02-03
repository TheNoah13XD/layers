import { View } from 'react-native';

import Icon from '../../components/ui/Icon';
import Type from '../../components/ui/Type';
import Fab from '../../components/ui/Fab';

const Start = () => {
    return (
        <View className='flex-1 justify-end items-start px-8 pb-52'>
            <Icon name='lock-open' size={57} color='onSecondaryContainer' />
            <View className='pt-5'>
                <Type stylize='text-displayLarge tracking-tightest text-onSecondaryContainer'>.layers</Type>
                <Type weight='medium' stylize='text-titleMedium tracking-wide text-onSecondaryContainer'>Unravel your layered feelings, punctuate your life with a comma.</Type>
            </View>
            <Fab type="large" containerColor='bg-secondaryContainer' contentColor='onSecondaryContainer' stylize='absolute bottom-11 right-10' />
        </View>
    );
}
 
export default Start;
