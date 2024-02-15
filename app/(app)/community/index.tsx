import { ScrollView } from 'react-native';

import { Section, Type } from '@components/styled';
import { Fab, Icon, Segment } from '@components/material';
import { Post } from '@components/community';

const Community = () => {
    return (
        <Section>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Section stylize='pt-[74px] pl-7'>
                    <Type weight='bold' stylize='text-displayMedium leading-[52px] tracking-tighter text-onSurface'>Your</Type>
                    <Type weight='bold' stylize='text-displayMedium leading-[52px] tracking-tighter text-onSurface'>Groups.</Type>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <Section stylize='flex-row mt-7'>
                            <Section stylize='flex-col justify-between bg-primaryContainer overflow-hidden rounded-[25px] w-[180px] h-[160px]'>
                                <Section stylize='pl-3 pt-4'>
                                    <Type stylize='text-headlineSmall tracking-tight text-black'>Chill</Type>
                                    <Type stylize='text-bodySmall tracking-wide w-20 pt-2 text-black'>Get your shit together man.</Type>
                                </Section>

                                <Section stylize='flex-row justify-center items-center bg-primaryFixedDim rounded-[18px] w-full py-[10px]'>
                                    <Icon family='materialCommunity' name='microphone-outline' color='black' size={16} />
                                    <Type stylize='text-bodySmall tracking-wide pl-2 uppercase'>Join Voice</Type>
                                </Section>
                            </Section>

                            <Section stylize='flex-col justify-between bg-primaryContainer overflow-hidden rounded-[25px] ml-1 w-[180px] h-[160px]'>
                                <Section stylize='pl-3 pt-4'>
                                    <Type stylize='text-headlineSmall tracking-tight text-black'>Relax</Type>
                                    <Type stylize='text-bodySmall tracking-wide w-20 pt-2 text-black'>Get your shit together man.</Type>
                                </Section>

                                <Section stylize='flex-row justify-center items-center bg-primaryFixedDim rounded-[18px] w-full py-[10px]'>
                                    <Icon family='materialCommunity' name='microphone-outline' color='black' size={16} />
                                    <Type stylize='text-bodySmall tracking-wide pl-2 uppercase'>Join Voice</Type>
                                </Section>
                            </Section>

                            <Section stylize='flex-col justify-between bg-primaryContainer overflow-hidden rounded-[25px] ml-1 w-[180px] h-[160px]'>
                                <Section stylize='pl-3 pt-4'>
                                    <Type stylize='text-headlineSmall tracking-tight text-black'>Enjoy</Type>
                                    <Type stylize='text-bodySmall tracking-wide w-20 pt-2 text-black'>Get your shit together man.</Type>
                                </Section>

                                <Section stylize='flex-row justify-center items-center bg-primaryFixedDim rounded-[18px] w-full py-[10px]'>
                                    <Icon family='materialCommunity' name='microphone-outline' color='black' size={16} />
                                    <Type stylize='text-bodySmall tracking-wide pl-2 uppercase'>Join Voice</Type>
                                </Section>
                            </Section>
                        </Section>
                    </ScrollView>

                    <Section stylize='flex-row justify-between w-full pr-7 mt-8'>
                        <Type stylize='text-headlineMedium text-onSurfaceVariant tracking-tight'>Recent Posts</Type>
                        <Icon name='notifications-none' color='onSecondaryContainer' stylize='flex justify-center items-center bg-secondaryContainer rounded-full w-10 h-10' />
                    </Section>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <Section stylize='flex-row items-center mt-2'>
                            <Type weight='medium' stylize='text-labelLarge'>Filter:</Type>
                            <Section stylize='flex-row ml-6'>
                                <Segment title='Group One' enabled={true} />
                                <Segment title='Group Two' enabled={false} stylize='ml-1' />
                                <Segment title='Group Three' enabled={false} stylize='ml-1' />
                            </Section>
                        </Section>
                    </ScrollView>

                    <Section stylize='mt-7 mb-24 pr-7'>
                        <Post name={"Totally Human"} group={"Chill"} content={"Sometimes I wonder, if James Bond is the most famous spy, wouldn't that also make him the worst spy?"} />
                        <Post name={"Totally Human"} group={"Chill"} content={"Sometimes I wonder, if James Bond is the most famous spy, wouldn't that also make him the worst spy?"} stylize='mt-3' />
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
