import { Text } from 'react-native';

interface TypeProps {
    children: React.ReactNode;
    weight?: 'regular' | 'medium' | 'bold';
    stylize?: string;
}

const fontWeights = {
    regular: 'ProductSansRegular',
    medium: 'ProductSansMedium',
    bold: 'ProductSansBold',
};

const Type = ({ children, weight = 'regular', stylize }: TypeProps) => {
    return (
        <Text style={{ fontFamily: fontWeights[weight] }} className={stylize}>
            {children}
        </Text>
    );
}

export default Type;
