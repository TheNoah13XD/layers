import { ActivityIndicator } from 'react-native';

import { Section } from '../components/ui/Stylize';

const Index = () => {
    return (
        <Section stylize='flex-1 justify-center items-center'>
            <ActivityIndicator size="large" color="#000" />
        </Section>
    );
}

export default Index;
