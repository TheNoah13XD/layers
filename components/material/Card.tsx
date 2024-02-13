import { Section } from "../styled";

interface CardProps {
    children?: React.ReactNode;
    stylize?: string;
}

export const Card = ({ children, stylize }: CardProps) => {
    return (
        <Section stylize={`border border-outline rounded-[25px] w-full p-3 ${stylize}`}>
            {children}
        </Section>
    );
}
