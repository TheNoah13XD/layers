import { useAuth } from '../../context/AuthContext';

import Button from '../../components/ui/Button';
import { Section } from '../../components/ui/Stylize';

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
