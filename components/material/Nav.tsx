import { TouchableOpacity } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import { Section, Type } from "../styled";
import { Icon } from "./Icon";
import { View } from "react-native";

export const Nav = ({ state, descriptors, navigation, ...props }: BottomTabBarProps) => {
    return (
        <Section {...props} stylize="absolute bottom-10 flex-row justify-center items-center self-center border border-outline rounded-full w-[360px] h-[70px] bg-[#F5FAFF] pt-[7px] pb-[11px]">
            {state.routes.filter(route => route.name !== 'index').map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        // @ts-ignore
                        navigation.navigate({ name: route.name, merge: true });
                    }
                };

                let iconName;
                let label;
                let family;

                switch (route.name) {
                    case 'home':
                        iconName = 'home';
                        family = 'material';
                        label = 'Home';
                        break;
                    case 'chats':
                        iconName = 'chat-bubble-outline';
                        family = 'material';
                        label = 'Chat';
                        break;
                    case 'community':
                        iconName = 'language';
                        family = 'material';
                        label = 'Community';
                        break;
                    case 'profile':
                        iconName = 'account-circle-outline';
                        family = 'materialCommunity';
                        label = 'Profile';
                        break;
                    default:
                        iconName = 'home';
                        family = 'material';
                        label = 'Home';
                        break;
                }

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        key={route.key}
                        className="flex-col justify-center items-center px-1"
                    >
                        <Section stylize={`${isFocused ? 'bg-secondaryContainer' : ''} rounded-full px-5 py-1`}>
                            <Icon family={family as 'material' | 'materialCommunity'} name={iconName as keyof typeof MaterialIcons.glyphMap | keyof typeof MaterialCommunityIcons.glyphMap} size={24} color={isFocused ? 'onSecondaryContainer' : 'onSurfaceVariant'} />
                        </Section>
                        {isFocused ? <Type weight="medium" stylize={`text-bodySmall leading-4 text-center pt-1 w-20`}>{label}</Type> : <View className="w-20"></View>}
                    </TouchableOpacity>
                );
            })}
        </Section>
    );
}
