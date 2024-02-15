import Checkbox from "expo-checkbox";

import { Section } from "../styled";

interface CheckProps {
    value: boolean;
    onValueChange: (value: boolean) => void;
    stylize?: string;
}

export const Check = ({ value, onValueChange, stylize }: CheckProps) => {
    return (
        <Section stylize={`flex-row items-center ${stylize}`}>
            <Checkbox className="m-2 rounded-[2px] w-[18px] h-[18px]" value={value} onValueChange={onValueChange} color={value ? "#605690" : undefined} />
        </Section>
    );
}
 