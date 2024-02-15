import { Stack } from "expo-router";

const RecordsLayout = () => {
    return (
        <Stack screenOptions={{ 
            contentStyle: { backgroundColor: '#FDF8FF'},
            headerShown: false,
        }}>
            <Stack.Screen 
                name="indexHistory" 
            />
            <Stack.Screen 
                name="journalHistory" 
            />
        </Stack>
    );
}
 
export default RecordsLayout;
