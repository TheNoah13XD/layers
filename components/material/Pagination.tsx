import { Section, Type } from "../styled";

interface PaginationProps {
    pages: number;
    currentPage: number;
    onPageChange?: (page: number) => void;
}

export const Pagination = ({ pages, currentPage, onPageChange }: PaginationProps) => {
    return (
        <Section stylize='flex-row items-center'>
            {Array.from({ length: pages }, (_, i) => (
                <Section key={i} stylize={`w-[50px] h-[10px] rounded-full ${currentPage === i + 1 ? 'bg-primary' : 'bg-inversePrimary'} mx-1`}>
                    <Type> </Type>
                </Section>
            ))}
        </Section>
    );
}
 