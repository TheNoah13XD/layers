import { Section } from "@components/styled";
import { Icon } from "@components/material";

export interface LikeProps {
    liked: boolean;
    action: () => void;
    stylize?: string;
}

export const Like = ({ liked, action, stylize }: LikeProps) => {
    const icon = liked ? 'favorite' : 'favorite-outline';
    const color = liked ? 'like' : 'onSurface';

    return (
        <Section stylize={stylize}>
            <Icon name={icon} color={color} onPress={() => action()} />
        </Section>
    );
}
