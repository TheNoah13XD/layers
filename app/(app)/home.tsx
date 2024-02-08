import { useAuth } from '../../context/AuthContext';

import { Section } from '@components/styled';
import { Button } from '@components/material';

const Home = () => {
    const { user, signout } = useAuth();

    console.log(user)
    return (
        <Section stylize='flex-1 justify-center items-center'>
            <Button type='text' contentColor='text-primary' onPress={signout}>Logout</Button>
        </Section>
    );
}
 
export default Home;
