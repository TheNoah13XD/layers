import { Section, Type } from "../styled";
import { Button } from "./Button";

interface SnackbarProps {
    view: boolean;
    message: string;
    hasNav?: boolean;
    action?: () => void;
}

export const Snackbar = ({ view, message, hasNav, action }: SnackbarProps) => {
    const display = view ? "bottom-5" : "-bottom-20";
    const nav = hasNav ? "bottom-28" : "-bottom-20"; 

    return (
        <Section stylize={`flex-row justify-between items-center absolute ${hasNav ? nav : display} self-center bg-inverseSurface rounded-full h-12 pl-6`}>
            <Type stylize="text-inverseOnSurface">{message}</Type>
            <Button type="text" contentColor="text-inversePrimary" onPress={action}>Close</Button>
        </Section>
    );
}
