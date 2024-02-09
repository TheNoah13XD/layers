import { useEffect } from 'react';
import { router } from 'expo-router';

import { useAuth } from '@context';

import { Section } from '@components/styled';
import { Button } from '@components/material';

const Home = () => {
    const { user, isAuthenticated, signout } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace('/start');
        } else if (user && user && !user.role) {
            router.replace('/assessments');
        }
    }, [isAuthenticated]);
    
    return (
        <Section stylize='flex-1 justify-center items-center'>
            <Button type='text' contentColor='text-primary' onPress={signout}>Logout</Button>
        </Section>
    );
}
 
export default Home;
