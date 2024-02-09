import React, { useState, useCallback, useMemo, useEffect } from "react";
import { router } from 'expo-router';

import { useAuth } from "@context";

import { Section, Type } from "@components/styled";
import { Fab, Icon, Pagination, Snackbar, Toggle } from "@components/material";
import { ShapeFive, ShapeFour, ShapeOne, ShapeSix, ShapeThree, ShapeTwo } from "@components/shapes";

const pageTexts = ['why this app?', 'age & gender?', 'helper? / seeker?'];
const maxPages = pageTexts.length;

const GeneralAssessments = () => {
    const { user, userUpdate } = useAuth();

    const [currentPage, setCurrentPage] = useState(1);
    const [snackbar, setSnackbar] = useState(false);
    const [error, setError] = useState('');

    const currentPageText = useMemo(() => pageTexts[currentPage - 1], [currentPage]);
    const [firstWord, ...remainingWords] = useMemo(() => currentPageText.split(' '), [currentPageText]);

    const [selectedShapes, setSelectedShapes] = useState(new Set());
    const [age, setAge] = useState<number>(15);
    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const [role, setRole] = useState<'helper' | 'seeker'>('helper');

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
                    role: role
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
                <Section stylize="relative flex-row flex-wrap self-center w-[320px] h-[460px] mt-7">
                    <ShapeOne stylize="absolute top-0 right-0" selected={selectedShapes.has('shapeOne')} onPress={() => handleSelect('shapeOne')} />
                    <ShapeTwo stylize="absolute top-[93px] left-0" selected={selectedShapes.has('ShapeTwo')} onPress={() => handleSelect('ShapeTwo')} />
                    <ShapeThree stylize="absolute top-[186px] right-0" selected={selectedShapes.has('ShapeThree')} onPress={() => handleSelect('ShapeThree')} />
                    <ShapeFour stylize="absolute bottom-0 left-0 -z-10" selected={selectedShapes.has('ShapeFour')} onPress={() => handleSelect('ShapeFour')} />
                </Section>
            ) : currentPage === 2 ? (
                <Section stylize="flex-col self-center justify-center items-center bg-primaryFixed rounded-[50px] w-[360px] h-[360px] mt-[65px]">
                    <Section stylize="flex-row justify-center items-center bg-primaryFixedDim rounded-full px-8 w-[308px] h-[120px]">
                        <Icon name="remove" color="onPrimaryContainer" stylize="justify-center items-center bg-onPrimary rounded-full w-10 h-10 m-1" onPress={decrementAge} />
                        <Section stylize="justify-center items-center bg-primary rounded-full w-[52px] h-8 ml-12">
                            <Type stylize="text-titleLarge text-onPrimary">{age}</Type>
                        </Section>
                        <Icon name="add" color="onPrimaryContainer" stylize="justify-center items-center bg-onPrimary rounded-full w-10 h-10 m-1 ml-12" onPress={incrementAge} />
                    </Section>
                    <Section stylize="flex-row justify-center items-center bg-primaryFixedDim rounded-full px-8 w-[308px] h-[120px] mt-5">
                        <Icon name="boy" color="onPrimaryContainer" stylize="justify-center items-center bg-onPrimary rounded-full w-10 h-10 m-1" />
                        <Section stylize="justify-center items-center bg-primary rounded-full w-[52px] h-8 ml-12">
                            <Toggle isEnabled={isEnabled} toggleSwitch={toggleSwitch} />
                        </Section>
                        <Icon name="girl" color="onPrimaryContainer" stylize="justify-center items-center bg-onPrimary rounded-full w-10 h-10 m-1 ml-12" />
                    </Section>
                </Section>
            ) : (
                <Section stylize="relative flex-row flex-wrap self-center w-[320px] h-[340px] mt-20">
                    <ShapeFive stylize="absolute top-0 right-0" selected={role === 'helper'} onPress={() => selectRole('helper')} />
                    <ShapeSix stylize="absolute bottom-0 left-0" selected={role === 'seeker'} onPress={() => selectRole('seeker')} />
                </Section>
            )}

            <Section stylize="flex-1">
                <Fab icon='arrow-forward' type="large" containerColor='bg-primaryContainer' contentColor='primary' stylize="absolute right-9 bottom-11" onPress={() => handlePageChange(currentPage)} />
            </Section>

            <Snackbar view={snackbar} message={error} action={() => setSnackbar(false)} />
        </Section>
    );
};

export default GeneralAssessments;
