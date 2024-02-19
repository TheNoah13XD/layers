import { Colors } from "@types";
import { Icon } from "./Icon";

export interface BackProps {
    color?: keyof Colors;
    onPress?: () => void;
    stylize?: string;
}

export const Back = ({ color = "secondary", onPress, stylize }: BackProps) => {
    return (
        <>
            <Icon name="arrow-back-ios-new" color={color} stylize={`absolute top-[88px] left-6 ${stylize}`} onPress={onPress} />
        </>
    );
}
