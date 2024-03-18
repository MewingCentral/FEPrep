import React from "react";
import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";

import Colors from "~/utils/colors";

export default function CardCreationLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <Stack screenOptions={{
      headerStyle: {
        backgroundColor:
          colorScheme == "dark" ? Colors.dark_sec : Colors.light_sec,
      },
      contentStyle: {
        backgroundColor: colorScheme == "dark" ? Colors.dark_bg : Colors.light_bg,
      },
      headerTintColor:
        colorScheme == "dark"
          ? Colors.dark_primary_text
          : Colors.light_primary_text,
    }}>
      <Stack.Screen
        name="create"
        options={{
          title: "Custom set: Untitled",
        }}
      />
    </Stack>
  );
}
