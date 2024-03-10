import React from "react";
import { Tabs } from "expo-router";

import { useColorScheme } from "nativewind";
import Colors from "../../../utils/colors";

export default function TabLayout() {
    const { colorScheme } = useColorScheme();
    return (
        <Tabs screenOptions={{
            headerShown: false,

            // Tab colors
            tabBarActiveBackgroundColor: Colors.dark_sec,
            tabBarInactiveBackgroundColor: Colors.dark_sec,
            tabBarActiveTintColor: Colors.dark_primary_text,
            tabBarInactiveTintColor: Colors.dark_secondary_text,

            // Tab text / labels
            tabBarLabelPosition: "beside-icon",
            tabBarLabelStyle: {
                fontSize: 16,
            },
            tabBarIconStyle: {
                display: "none",
            }
        }}>
            <Tabs.Screen name="studySets" options={{
                title: "Study Sets",
            }}/>
            <Tabs.Screen name="customSets" options={{
                title: "Custom Sets",
            }}/>
        </Tabs>
    );
}
