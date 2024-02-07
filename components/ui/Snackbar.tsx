import Button from "./Button";
import { Section, Type } from "./Stylize";

interface SnackbarProps {
    view: boolean;
    message: string;
    action?: () => void;
}

const Snackbar = ({ view, message, action }: SnackbarProps) => {
    const display = view ? "bottom-2" : "-bottom-20";

    return (
        <Section stylize={`flex-row justify-between items-center absolute ${display} self-center bg-inverseSurface rounded-full h-12 pl-6`}>
            <Type stylize="text-inverseOnSurface">{message}</Type>
            <Button type="text" contentColor="text-inversePrimary" onPress={action}>Close</Button>
        </Section>
    );
}
 
export default Snackbar;