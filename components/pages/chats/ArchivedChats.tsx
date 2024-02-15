import { Section, Type } from "@components/styled";
import { Fab, Icon } from "@components/material";

export interface ArchivedChatProps {
    name: string;
    stylize?: string;
}

export const ArchivedChat = ({ name, stylize }: ArchivedChatProps) => {
    return (
        <Section stylize={`flex-row justify-between items-center bg-primaryFixedDim rounded-full mx-[6px] px-3 py-5 mt-1 ${stylize}`}>
            <Section stylize='flex-row items-center'>
                <Section stylize='flex justify-center items-center bg-primaryContainer rounded-full w-10 h-10'>
                    <Icon family='materialCommunity' name='account-outline' color='primary' size={28} />
                </Section>
                <Type stylize='text-headlineSmall text-primary tracking-tight pl-2'>{name}</Type>
            </Section>

            <Fab icon='keyboard-arrow-right' type='small' containerColor='bg-primaryContainer' contentColor='primary' />
        </Section>
    );
}
