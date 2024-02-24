import { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

import { Post } from '@types';

import { Section, Type } from '@components/styled';
import { Fab, Icon, Loading, Snackbar } from '@components/material';
import { PostCard, Stage } from '@components/pages/community';
import { useAuth } from '@context';
import { fetchPostsOfUserGroups } from 'utils/firebase';
import { SegmentFilter } from '@components/pages/explore';

const Community = () => {
    const { user } = useAuth();
    if (!user) {
        return null;
    }

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<Post[]>([]);

    const segments = data
        .map(post => post.groupName)
        .filter((groupName, index, self) => self.indexOf(groupName) === index);
    const [selectedSegments, setSelectedSegments] = useState<string[]>([]);
    const [filteredData, setFilteredData] = useState<Post[]>([]);

    const [snackbar, setSnackbar] = useState(false);
    const [error, setError] = useState('');

    const showError = (message: string) => {
        setError(message);
        setSnackbar(true);
        setTimeout(() => setSnackbar(false), 2000);
    };
    
    const handleVoiceJoin = () => {
        showError('Voice chats are still in development');
    }

    const handleSegmentPress = (segment: string) => {
        setSelectedSegments(prev => {
            if (prev.includes(segment)) {
                return prev.filter(s => s !== segment);
            } else {
                return [...prev, segment];
            }
        });
    };

    useEffect(() => {
        let result = data;

        if (selectedSegments.length > 0) {
            result = result.filter(post => selectedSegments.includes(post.groupName));
            setFilteredData(result);
        } else {
            setFilteredData(data);
        }

    }, [selectedSegments, data]);

    useEffect(() => {
        if (user.groups && user.groups.length > 0) {
            setIsLoading(true);
            const unsubscribe = fetchPostsOfUserGroups(user.groups, (posts) => {
                setData(posts);
                setIsLoading(false);
            });

            return () => unsubscribe();
        }
    }, [user]);

    return (
        <Section stylize='h-full'>
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

                            {user.role === "helper" && (
                                <Section stylize={`flex-col justify-between border-[3px] border-primaryContainer overflow-hidden rounded-[25px] w-[180px] h-[160px] `}>
                                    <Section stylize='pl-3 pt-4'>
                                        <Icon name='add' color='black' size={32} />
                                        <Type stylize='text-bodySmall tracking-wide w-full pt-2 text-black'>Create and moderate a new group.</Type>
                                    </Section>
    
                                    <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/community/newGroup')}>
                                        <Section stylize='flex-row justify-center items-center bg-primaryFixedDim rounded-[18px] w-full py-[10px]'>
                                            <Icon name='arrow-right-alt' color='black' size={16} />
                                            <Type stylize='text-bodySmall tracking-wide pl-2 uppercase'>Proceed</Type>
                                        </Section>
                                    </TouchableOpacity>
                                </Section>
                            )}

                            <Stage name='Chill' description='Get your shit together man.' stylize={user.role === "helper" ? "ml-1" : ""} onPress={handleVoiceJoin} />
                            <Stage name='Relax' description='Get your shit together man.' stylize='ml-1' onPress={handleVoiceJoin} />
                            <Stage name='Enjoy' description='Get your shit together man.' stylize='ml-1' onPress={handleVoiceJoin} />
                        </Section>
                    </ScrollView>

                    <Section stylize='flex-row justify-between w-full px-7 mt-8'>
                        <Type stylize='text-headlineMedium text-onSurfaceVariant tracking-tight'>Recent Posts</Type>
                        <Icon name='notifications-none' color='onSecondaryContainer' stylize='flex justify-center items-center bg-secondaryContainer rounded-full w-10 h-10' />
                    </Section>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <Section stylize='pl-7'>
                            <SegmentFilter segments={segments} selectedSegments={selectedSegments} handleSegmentPress={handleSegmentPress} stylize='mt-0' />
                        </Section>
                    </ScrollView>

                    <Section stylize='mt-7 mb-24 px-7'>
                        {isLoading ? (
                            <Loading />
                        ) : (
                            filteredData.length > 0 ? (
                                filteredData.map((post, index) => (
                                    <PostCard key={post.id} id={post.id} userId={post.user} name={post.username} group={post.groupName} groupId={post.groupId} content={post.content} likedBy={post.likedBy} time={post.time} stylize={`
                                        ${index === 0 ? '' : 'mt-3'}
                                    `} />
                                ))
                            ) : (
                                <Type stylize='text-headlineMedium text-onSurfaceVariant text-center tracking-tight'>No posts to show.</Type>
                            )
                        )}
                    </Section>
                </Section>
            </ScrollView>

            <Section stylize='absolute right-[26px] bottom-28'>
                <Fab type='regular' icon='mode-edit' containerColor='bg-primaryContainer' contentColor='onPrimaryContainer' stylize='rounded-2xl border border-outline' onPress={() => {
                    router.push({ pathname: '/community/newPost', params: { type: 'newPost' } });
                }} />
            </Section>

            {snackbar && <Snackbar hasNav view={snackbar} message={error} action={() => setSnackbar(false)} />}
        </Section>
    );
}
 
export default Community;
