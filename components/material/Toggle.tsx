import { Switch, SwitchProps } from "react-native";

interface CheckProps {
    isEnabled: boolean;
    toggleSwitch: () => void;
    rest?: SwitchProps;
}

export const Toggle = ({ isEnabled, toggleSwitch, rest }: CheckProps) => {
    return (
        <Switch
            trackColor={{false: '#605690', true: '#605690'}}
            thumbColor={isEnabled ? '#fff' : '#fff'}
            ios_backgroundColor="#605690"
            onValueChange={toggleSwitch}
            value={isEnabled}
            {...rest}
        />
    );
}
 