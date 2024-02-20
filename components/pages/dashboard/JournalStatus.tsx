import { useEffect, useState } from "react";
import { Journal, User } from "@types";

import { fetchTodayJournal } from "utils/firebase";

import { Section, Type } from "@components/styled";
import { Icon } from "@components/material";
import { Link, router } from "expo-router";
import { TouchableOpacity } from "react-native";

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

    const seeker = user.role === 'seeker';

    return (
        <Section stylize={`flex-col ${seeker ? "bg-primaryFixedDim" : "bg-secondaryFixedDim"} rounded-[25px] p-4 ${stylize}`}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => router.push(`${journal?.id ? `/home/records/journal/newJournal` : '/home/records/journal/newJournal'}`)}>
                <Type stylize={`text-titleLarge tracking-tight text-black ${journal?.id ? 'w-64' : 'w-44'}`}>
                    {journal?.id ? 'You have already started today\'s journal.' : 'Start your journal for today.'}
                </Type>
            </TouchableOpacity>
            <Section stylize='flex-row justify-between items-center w-full mt-12'>
                <Type stylize={`text-titleLarge ${seeker ? "text-onPrimaryFixed" : "text-onSecondaryFixed"} tracking-tight`}>{date}</Type>
                <Section stylize='flex-row'>
                    <Link href={{ 
                        pathname: `${journal?.id && !isLoading ? `/home/records/journal/newJournal` : !journal?.id && !isLoading && '/home/records/journal/newJournal'}`,
                        params: { journal, type: 'edit' }
                     }}>
                        <Icon family={isLoading ? "loading" : "material"} name='edit' color='onPrimary' size={16} stylize={`flex justify-center items-center ${seeker ? "bg-primary" : "bg-secondary"} rounded-full w-7 h-7`}/>
                    </Link>
                    <Link href={{
                        pathname: `${journal?.id && !isLoading ? `/home/records/journal/newJournal` : !journal?.id && !isLoading && '/home/records/journal/newJournal'}`,
                        params: { journal, type: 'mic' }
                    }} className="ml-2">
                        <Icon family={isLoading ? "loading" : "material"} name='mic' color='onPrimary' size={16} stylize={`flex justify-center items-center ${seeker ? "bg-primary" : "bg-secondary"} rounded-full w-7 h-7`}/>
                    </Link>
                </Section>
            </Section>
        </Section>
    );
}
