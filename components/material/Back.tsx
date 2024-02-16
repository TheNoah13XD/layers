import { Colors } from "@types";
import { Icon } from "./Icon";

export interface BackProps {
    color?: keyof Colors;
    onPress?: () => void;
}

export const Back = ({ color = "secondary", onPress }: BackProps) => {
    return (
        <>
            <Icon name="arrow-back-ios-new" color={color} stylize="absolute top-[88px] left-6" onPress={onPress} />
        </>
    );
}
