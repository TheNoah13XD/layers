import { useState } from "react";

import { Section } from "../styled";
import { Icon } from "../material";

export interface LikeProps {
    action?: () => void;
}

export const Like = ({ action }: LikeProps) => {
    const [liked, setLiked] = useState(false);

    const icon = liked ? 'favorite' : 'favorite-outline';
    const color = liked ? 'like' : 'onSurface';

    return (
        <Section>
            <Icon name={icon} color={color} onPress={() => {
                setLiked(!liked);
                if (action) action();
            }} />
        </Section>
    );
}
