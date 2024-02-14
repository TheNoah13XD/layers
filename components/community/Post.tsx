import { Section, Type } from "../styled";
import { Card, Icon } from "../material";
import { Like } from "./Like";

export interface PostProps {
    name: string;
    group: string;
    content: string;
    stylize?: string;
}

export const Post = ({ name, group, content, stylize }: PostProps) => {
    return (
        <Card stylize={stylize}>
            <Section stylize={`flex-row justify-between items-center pt-2 pl-2 pr-1`}>
                <Section stylize='flex-row items-center'>
                    <Section stylize='flex justify-center items-center bg-primaryContainer rounded-full w-10 h-10'>
                        <Icon family='materialCommunity' name='account-outline' color='primary' size={28} />
                    </Section>
                    <Section stylize='ml-2'>
                        <Type stylize='text-bodyMedium text-onSurface leading-[20px] tracking-wide'>{name}</Type>
                        <Section stylize='flex-row'>
                            <Type stylize='text-bodySmall text-onSurfaceVariant leading-[16px] tracking-wide'>on:</Type>
                            <Type stylize='text-bodySmall text-primary leading-[16px] tracking-wide pl-2'>{group}</Type>
                        </Section>
                    </Section>
                </Section>
                <Icon name='more-vert' color='onSurfaceVariant' />
            </Section>

            <Section stylize='mt-[18px] pl-2'>
                <Type weight='medium' stylize='text-bodySmall leading-[16px] text-black tracking-wide'>{content}</Type>
            </Section>

            <Section stylize='flex-row self-end mt-8'>
                <Like />
                <Icon family='materialCommunity' name='comment-outline' color='onSurface' stylize='pl-5' />
                <Icon name='share' color='onSurface' stylize='pl-5' />
            </Section>
        </Card>
    );
}
