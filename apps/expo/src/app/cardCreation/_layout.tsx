import React from "react";
import { Stack } from "expo-router";

import { useColorScheme } from "nativewind";

import Colors from "~/utils/colors";

export default function cardCreationLayout() {
    const { colorScheme } = useColorScheme();
    return (
        <Stack screenOptions={{
            // headerShown: false,
            title: "Custom set: Untitled",
            headerStyle: {
                backgroundColor: Colors.dark_sec,
            },
            contentStyle: {
                backgroundColor: Colors.dark_bg,
            },
            headerTintColor:
            colorScheme == "dark"
              ? Colors.dark_primary_text
              : Colors.light_primary_text,
        }}>
        </Stack>
    );
};