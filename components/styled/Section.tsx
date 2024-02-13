import { View } from "react-native";
import { styled } from "nativewind";

interface SectionProps {
    children?: React.ReactNode;
    stylize?: string;
}
const StyledView = styled(View)

export const Section = ({ children, stylize }: SectionProps) => {
    return (
        <StyledView className={stylize}>
            {children}
        </StyledView>
    );
}
