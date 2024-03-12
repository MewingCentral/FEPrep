import React from "react";
import { Stack } from "expo-router";

import { useColorScheme } from "nativewind";

import Colors from "~/utils/colors";
import headerDefault from "~/utils/headerDefault";

export default function cardCreationLayout() {
    const { colorScheme } = useColorScheme();
    return (
        <Stack screenOptions={headerDefault}>
        </Stack>
    );
};