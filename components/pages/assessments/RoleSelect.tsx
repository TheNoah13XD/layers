import { Section } from "@components/styled";
import { ShapeFive, ShapeSix } from "@components/shapes";

export interface RoleSelectProps {
    role: string;
    selectRole: (role: string) => void;
    stylize?: string;
}

export const RoleSelect = ({ role, selectRole, stylize }: RoleSelectProps) => {
    return (
        <Section stylize={`relative flex-row flex-wrap self-center w-[320px] h-[340px] ${stylize}`}>
            <ShapeFive stylize="absolute top-0 right-0" selected={role === 'helper'} onPress={() => selectRole('helper')} />
            <ShapeSix stylize="absolute bottom-0 left-0" selected={role === 'seeker'} onPress={() => selectRole('seeker')} />
        </Section>
    );
}
