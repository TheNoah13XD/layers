import React, { useState, useCallback, useMemo, useEffect } from "react";
import { router } from 'expo-router';

import { useAuth } from "@context";

import { Section, Type } from "@components/styled";
import { Fab, Icon, Pagination, Snackbar } from "@components/material";
import { InfoSelect, ReasonSelect, RoleSelect } from "@components/pages/assessments";

const pageTexts = ['why this app?', 'age & gender?', 'helper? / seeker?'];
const maxPages = pageTexts.length;

const GeneralAssessments = () => {
    const { user, userUpdate, isLoading } = useAuth();

    const [currentPage, setCurrentPage] = useState(1);
    const [snackbar, setSnackbar] = useState(false);
    const [error, setError] = useState('');

    const currentPageText = useMemo(() => pageTexts[currentPage - 1], [currentPage]);
    const [firstWord, ...remainingWords] = useMemo(() => currentPageText.split(' '), [currentPageText]);

    const [selectedShapes, setSelectedShapes] = useState<Set<string>>(new Set());
    const [age, setAge] = useState<number>(15);
    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const [role, setRole] = useState<'helper' | 'seeker'>('helper');

    const family = isLoading ? 'loading' : 'material';

    useEffect(() => {
        if (error) {
            setSnackbar(true);
            const timer = setTimeout(() => setSnackbar(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleSelect = useCallback((shape: string) => {
        setSelectedShapes(prevShapes => {
            const newShapes = new Set(prevShapes);
            newShapes.has(shape) ? newShapes.delete(shape) : newShapes.add(shape);
            return newShapes;
        });
    }, []);

    const incrementAge = useCallback(() => setAge(prevAge => prevAge < 99 ? prevAge + 1 : prevAge), []);
    const decrementAge = useCallback(() => setAge(prevAge => prevAge > 15 ? prevAge - 1 : prevAge), []);
    const toggleSwitch = useCallback(() => setIsEnabled(prev => !prev), []);

    const selectRole = useCallback((selectedRole: string) => setRole(selectedRole as 'helper' | 'seeker'), []);

    const handlePreviousPage = useCallback(() => setCurrentPage(prevPage => prevPage > 1 ? prevPage - 1 : prevPage), []);
    
    const handlePageChange = useCallback(async (page: number) => {
        if (selectedShapes.size === 0 && page === 1) {
            setError('Please select at least one shape');
            return;
        } else if (page === maxPages && user) {
            try {
                await userUpdate(user.id, {
                    age,
                    gender: isEnabled ? 'female' : 'male',
                    role: role,
                    score: 80
                });

                router.replace('/home');
                return;
            } catch (error) {
                setError((error as Error).message);
                return;
            }
        }
        setCurrentPage(prevPage => (page > 0 && page < maxPages) ? prevPage + 1 : prevPage);
    }, [selectedShapes, maxPages, age, isEnabled, role]);

    return (
        <Section stylize="h-full">
            <Section stylize="flex-row w-full justify-center items-center mt-[65px]">
                {currentPage > 1 && <Icon name="arrow-back-ios-new" size={24} color="primary" stylize="absolute left-6" onPress={handlePreviousPage} />}
                <Pagination pages={maxPages} currentPage={currentPage} />
            </Section>

            <Section stylize="ml-7 mt-10 w-[285px]">
                <Type weight="bold" stylize="text-[64px] tracking-tightest leading-[70px] text-onPrimaryContainer">
                    {firstWord + '\n' + remainingWords.join(' ')}
                </Type>
            </Section>

            {currentPage === 1 ? (
                <ReasonSelect selectedShapes={selectedShapes} handleSelect={handleSelect} stylize="mt-7" />
            ) : currentPage === 2 ? (
                <InfoSelect age={age} incrementAge={incrementAge} decrementAge={decrementAge} isEnabled={isEnabled} toggleSwitch={toggleSwitch} stylize="mt-[65px]" />
            ) : (
                <RoleSelect role={role} selectRole={selectRole} stylize="mt-20" />
            )}

            <Section stylize="flex-1">
                <Fab family={family} icon='arrow-forward' type="large" containerColor='bg-primaryContainer' contentColor='primary' stylize="absolute right-9 bottom-11" onPress={() => handlePageChange(currentPage)} />
            </Section>

            <Snackbar view={snackbar} message={error} action={() => setSnackbar(false)} />
        </Section>
    );
};

export default GeneralAssessments;
