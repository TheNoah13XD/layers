import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

import { Button, Dialog } from "@components/material";

interface DatePickerProps {
    openDialog: boolean;
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
    startDate: Date | null;
    setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
    endDate: Date | null;
    setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
    getCustomRecords: () => void;
}

export const DatePickerDialog = ({ openDialog, setOpenDialog, startDate, setStartDate, endDate, setEndDate, getCustomRecords }: DatePickerProps) => {
    const onChangeStartDate = (event: any, selectedDate: Date | undefined) => {
        const currentDate = selectedDate;
        if (currentDate) {
            setStartDate(currentDate);
        }
    };
    
    const onChangeEndDate = (event: any, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || endDate;
        if (currentDate) {
            setEndDate(currentDate);
        }
    };

    const showStartDate = () => {
        DateTimePickerAndroid.open({
            value: startDate || new Date(),
            onChange: onChangeStartDate,
            mode: 'date',
            is24Hour: true,
        });
    };

    const showEndDate = () => {
        DateTimePickerAndroid.open({
            value: endDate || new Date(),
            onChange: onChangeEndDate,
            mode: 'date',
            is24Hour: true,
        });
    };

    return (
        openDialog && (
            <Dialog
                title="Enter Dates" 
                icon="today" 
                onConfirm={getCustomRecords}
                onCancel={() => setOpenDialog(false)}
            >
                <Button type="outlined" contentColor="text-secondary" onPress={showStartDate}>
                    {startDate ? startDate.toLocaleDateString() : 'Start Date'}
                </Button>
                <Button type="outlined" contentColor="text-secondary" onPress={showEndDate} stylize="ml-3">
                    {endDate ? endDate.toLocaleDateString() : 'End Date'}
                </Button>
            </Dialog>
        )
    );
};
