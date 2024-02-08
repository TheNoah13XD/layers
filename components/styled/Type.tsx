import { Text } from 'react-native';
import { styled } from 'nativewind';

import { FontWeight } from '@constants';

interface TypeProps {
    children: React.ReactNode;
    weight?: 'regular' | 'medium' | 'bold';
    stylize?: string;
}
const StyledText = styled(Text)

export const Type = ({ children, weight = 'regular', stylize }: TypeProps) => {
    return (
        <StyledText style={{ fontFamily: FontWeight[weight] }} className={stylize}>
            {children}
        </StyledText>
    );
}
