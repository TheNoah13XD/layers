import { Section, Type } from "@components/styled";
import { Icon } from "@components/material";

export interface JournalStatusProps {
    status: 'started' | 'not-started';
    stylize?: string;
}

export const JournalStatus = ({ status, stylize }: JournalStatusProps) => {
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });

    return (
        <Section stylize={`flex-col bg-primaryFixedDim rounded-[25px] p-4 ${stylize}`}>
            <Type stylize='text-titleLarge tracking-tight w-64 text-black'>
                {status === 'started' ? 'You have already started today\'s journal.' : 'Start your journal for today.'}
            </Type>
            <Section stylize='flex-row justify-between items-center w-full mt-12'>
                <Type stylize='text-titleLarge text-onPrimaryFixed tracking-tight'>{date}</Type>
                <Section stylize='flex-row'>
                    <Icon name='edit' color='onPrimary' size={16} stylize='flex justify-center items-center bg-primary rounded-full w-7 h-7'/>
                    <Icon name='mic' color='onPrimary' size={16} stylize='flex justify-center items-center bg-primary rounded-full w-7 h-7 ml-2'/>
                </Section>
            </Section>
        </Section>
    );
}
