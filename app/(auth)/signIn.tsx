import { Section, Type } from '../../components/ui/Stylize';
import Icon from '../../components/ui/Icon';

const SignIn = () => {
    return (
        <Section>
            <Section stylize='flex flex-col'>
                <Icon name='lock-open' size={57} color='black' />
                <Section stylize='flex flex-col space-y-12'>
                    <Type stylize='text-displayMedium tracking-tightest text-black'>Sign In</Type>
                    <Type stylize='text-titleSmall text-onSurface'>with your Layers Account or Google Account.</Type>
                </Section>
            </Section>
        </Section>
    );
}
 
export default SignIn;
