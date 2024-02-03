import { Text, View } from 'react-native';

import { styled } from 'nativewind';

interface SectionProps {
    children: React.ReactNode;
    stylize?: string;
}

interface TypeProps {
    children: React.ReactNode;
    weight?: 'regular' | 'medium' | 'bold';
    stylize?: string;
}

const StyledView = styled(View)
const StyledText = styled(Text)

const Section = ({ children, stylize }: SectionProps) => {
    return (
        <StyledView className={stylize}>
            {children}
        </StyledView>
    );
}

const Type = ({ children, weight = 'regular', stylize }: TypeProps) => {
    const fontWeights = {
        regular: 'ProductSansRegular',
        medium: 'ProductSansMedium',
        bold: 'ProductSansBold',
    };

    return (
        <StyledText style={{ fontFamily: fontWeights[weight] }} className={stylize}>
            {children}
        </StyledText>
    );
}

export { Section, Type };
