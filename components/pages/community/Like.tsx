import { useState } from "react";

import { Section } from "@components/styled";
import { Icon } from "@components/material";

export interface LikeProps {
    action?: () => void;
    stylize?: string;
}

export const Like = ({ action, stylize }: LikeProps) => {
    const [liked, setLiked] = useState(false);

    const icon = liked ? 'favorite' : 'favorite-outline';
    const color = liked ? 'like' : 'onSurface';

    return (
        <Section stylize={stylize}>
            <Icon name={icon} color={color} onPress={() => {
                setLiked(!liked);
                if (action) action();
            }} />
        </Section>
    );
}
