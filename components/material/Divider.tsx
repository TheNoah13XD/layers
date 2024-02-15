import { Section } from "../styled";

interface DividerProps {
    stylize?: string;
}

export const Divider = ({ stylize }: DividerProps) => {
    return (
        <Section stylize={`border-b border-outlineVariant ${stylize}`} children />
    );
}
