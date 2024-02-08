import { Section, Type } from "../styled";
import { Button } from "./Button";

interface SnackbarProps {
    view: boolean;
    message: string;
    action?: () => void;
}

export const Snackbar = ({ view, message, action }: SnackbarProps) => {
    const display = view ? "bottom-2" : "-bottom-20";

    return (
        <Section stylize={`flex-row justify-between items-center absolute ${display} self-center bg-inverseSurface rounded-full h-12 pl-6`}>
            <Type stylize="text-inverseOnSurface">{message}</Type>
            <Button type="text" contentColor="text-inversePrimary" onPress={action}>Close</Button>
        </Section>
    );
}
