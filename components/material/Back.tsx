import { Icon } from "./Icon";

export interface BackProps {
    onPress?: () => void;
}

export const Back = ({ onPress }: BackProps) => {
    return (
        <>
            <Icon name="arrow-back-ios-new" color="secondary" stylize="absolute top-[88px] left-6" onPress={onPress} />
        </>
    );
}
