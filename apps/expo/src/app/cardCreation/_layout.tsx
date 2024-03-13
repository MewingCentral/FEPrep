import React from "react";
import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";

import headerDefault from "~/utils/header-default";

export default function cardCreationLayout() {
    const { colorScheme } = useColorScheme();
    
    return (
        <Stack screenOptions={headerDefault(colorScheme)}>
            <Stack.Screen name="create" options={{
                title: "Custom set: Untitled",
            }} />
        </Stack>
    );
};