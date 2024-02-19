import { useEffect, useState } from "react";
import { Journal, User } from "@types";

import { fetchTodayJournal } from "utils/firebase";

import { Section, Type } from "@components/styled";
import { Icon } from "@components/material";
import { Link } from "expo-router";

export interface JournalStatusProps {
    user: User;
    stylize?: string;
}

export const JournalStatus = ({ user, stylize }: JournalStatusProps) => {
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });

    const [isLoading, setIsLoading] = useState(false);
    const [journal, setJournal] = useState<Journal | null>(null);

    useEffect(() => {
        setIsLoading(true);
        const unsubscribe = fetchTodayJournal(user.id, (journal) => {
            setJournal(journal);
            setIsLoading(false);
        });  

        return () => unsubscribe();
    }, []);

    return (
        <Section stylize={`flex-col bg-primaryFixedDim rounded-[25px] p-4 ${stylize}`}>
            <Type stylize={`text-titleLarge tracking-tight text-black ${journal?.id ? 'w-64' : 'w-44'}`}>
                {journal?.id ? 'You have already started today\'s journal.' : 'Start your journal for today.'}
            </Type>
            <Section stylize='flex-row justify-between items-center w-full mt-12'>
                <Type stylize='text-titleLarge text-onPrimaryFixed tracking-tight'>{date}</Type>
                <Section stylize='flex-row'>
                    <Link href={{ 
                        pathname: `${journal?.id ? `/home/records/journal/newJournal` : '/home/records/journal/newJournal'}`,
                        params: { journal, type: 'edit' }
                     }}>
                        <Icon name='edit' color='onPrimary' size={16} stylize='flex justify-center items-center bg-primary rounded-full w-7 h-7'/>
                    </Link>
                    <Link href={{
                        pathname: `${journal?.id ? `/home/records/journal/${journal.id}` : '/home/records/journal/newJournal'}`,
                        params: { journal, type: 'mic' }
                    }} className="ml-2">
                        <Icon name='mic' color='onPrimary' size={16} stylize='flex justify-center items-center bg-primary rounded-full w-7 h-7'/>
                    </Link>
                </Section>
            </Section>
        </Section>
    );
}
