import { Text, TextProps } from 'react-native';
import { styled } from 'nativewind';

import { FontWeight } from '@constants';

interface TypeProps {
    children: React.ReactNode;
    weight?: 'regular' | 'medium' | 'bold';
    stylize?: string;
    rest?: TextProps;
}
const StyledText = styled(Text)

export const Type = ({ children, weight = 'regular', stylize, rest }: TypeProps) => {
    return (
        <StyledText style={{ fontFamily: FontWeight[weight] }} className={stylize} {...rest}>
            {children}
        </StyledText>
    );
}
