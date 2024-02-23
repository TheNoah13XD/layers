import { StyleSheet } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";

import { FontWeight } from "@constants";

import { Section } from "../styled";
import { Icon } from "./Icon";

interface SelectProps {
    data: Array<{ label: string, value: string }>;
    value: any;
    onChange: (item: any) => void;
    multi?: boolean;
    placeholder: string;
    icon: keyof typeof MaterialIcons.glyphMap | keyof typeof MaterialCommunityIcons.glyphMap;
    family?: 'material' | 'materialCommunity' | 'loading';
    stylize?: string;
}

export const Select = ({ data, value, onChange, multi = false, placeholder, icon, family = 'material', stylize }: SelectProps) => {
    return (
        <Section stylize={stylize}>
            {multi ?(
                <MultiSelect
                    data={data}
                    value={value}
                    onChange={onChange}
                    valueField="value"
                    labelField="label"
                    placeholder={placeholder}
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    containerStyle={styles.containerStayle}
                    itemContainerStyle={styles.itemContainerStyle}
                    itemTextStyle={styles.selectedTextStyle}
                    selectedStyle={styles.selectedStyle}
                    activeColor="#CABEFF"
                    renderLeftIcon={() => (
                        <Icon family={family} name={icon} color="onSurfaceVariant" />
                    )}
                />
            ) : (
                <Dropdown
                    data={data}
                    value={value}
                    onChange={onChange}
                    valueField="value"
                    labelField="label"
                    placeholder={placeholder}
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    containerStyle={styles.containerStayle}
                    itemContainerStyle={styles.itemContainerStyle}
                    itemTextStyle={styles.selectedTextStyle}
                    activeColor="#CABEFF"
                    renderLeftIcon={() => (
                        <Icon family={family} name={icon} color="onSurfaceVariant" />
                    )}
                />
            )}
        </Section>
    );
}

const styles = StyleSheet.create({
    dropdown: {
        backgroundColor: '#E6DEFF',
        borderRadius: 120,
        height: 56,
        paddingLeft: 12,
        paddingRight: 12,
    },
    placeholderStyle: {
        fontFamily: FontWeight['regular'],
        fontSize: 16,
        paddingLeft: 12,
        color: '#48454E',
    },
    containerStayle: {
        backgroundColor: '#E6DEFF',
        borderRadius: 12,
    },
    selectedTextStyle: {
        fontFamily: FontWeight['regular'],
        fontSize: 16,
        paddingLeft: 12,
        color: '#48454E',
    },
    itemContainerStyle: {
        backgroundColor: '#E6DEFF',
        borderRadius: 12,
        height: 56,
    },
    selectedStyle: {
        backgroundColor: '#CABEFF',
        borderWidth: 1,
        borderColor: '#79757F',
        borderRadius: 12,
    },
});
