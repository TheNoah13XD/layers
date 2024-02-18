import { ScrollView } from 'react-native';
import { router } from 'expo-router';

import { Section, Type } from '@components/styled';
import { Fab, Icon, Segment } from '@components/material';
import { PostCard, Stage } from '@components/pages/community';

const Community = () => {
    return (
        <Section>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Section stylize='pt-[74px]'>
                    <Section stylize='flex-row justify-between items-center w-full px-7'>
                        <Section>
                            <Type weight='bold' stylize='text-displayMedium leading-[52px] tracking-tighter text-onSurface'>Your</Type>
                            <Type weight='bold' stylize='text-displayMedium leading-[52px] tracking-tighter text-onSurface'>Groups.</Type>
                        </Section>
                        <Icon name="search" color="onSecondaryContainer" stylize="bg-secondaryContainer rounded-full p-3" onPress={() => router.push('/community/explore')} />
                    </Section>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <Section stylize='flex-row mt-7 mx-7'>
                            <Stage name='Chill' description='Get your shit together man.' />
                            <Stage name='Relax' description='Get your shit together man.' stylize='ml-1' />
                            <Stage name='Enjoy' description='Get your shit together man.' stylize='ml-1' />
                        </Section>
                    </ScrollView>

                    <Section stylize='flex-row justify-between w-full px-7 mt-8'>
                        <Type stylize='text-headlineMedium text-onSurfaceVariant tracking-tight'>Recent Posts</Type>
                        <Icon name='notifications-none' color='onSecondaryContainer' stylize='flex justify-center items-center bg-secondaryContainer rounded-full w-10 h-10' />
                    </Section>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <Section stylize='flex-row items-center mt-2 pl-7'>
                            <Type weight='medium' stylize='text-labelLarge'>Filter:</Type>
                            <Section stylize='flex-row ml-6 mr-7'>
                                <Segment title='Group One' enabled={true} />
                                <Segment title='Group Two' enabled={false} stylize='ml-1' />
                                <Segment title='Group Three' enabled={false} stylize='ml-1' />
                            </Section>
                        </Section>
                    </ScrollView>

                    <Section stylize='mt-7 mb-24 px-7'>
                        <PostCard id={"ok"} name={"Totally Human"} group={"Chill"} content={"Sometimes I wonder, if James Bond is the most famous spy, wouldn't that also make him the worst spy?"} likedBy={[]} />
                        <PostCard id={"ok"} name={"Totally Human"} group={"Chill"} content={"Sometimes I wonder, if James Bond is the most famous spy, wouldn't that also make him the worst spy?"} likedBy={[]} stylize='mt-3' />
                    </Section>
                </Section>
            </ScrollView>

            <Section stylize='absolute right-[26px] bottom-28'>
                <Fab type='regular' icon='mode-edit' containerColor='bg-primaryContainer' contentColor='onPrimaryContainer' stylize='rounded-2xl border border-outline'  />
            </Section>
        </Section>
    );
}
 
export default Community;
