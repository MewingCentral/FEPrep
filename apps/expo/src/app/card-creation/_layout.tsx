import React from "react";
import { Pressable } from "react-native";
import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";
import { RadixIcon } from "radix-ui-react-native-icons";

import Colors from "~/utils/colors";

// Todo : button press doesn't work, update props
function HomeBtn() {
  return (
    <Pressable onPress={() => this.props.navigator.push('studySets')}>
      <RadixIcon name="home" color={Colors.dark_secondary_text} />
    </Pressable>
  );
}

export default function CardCreationLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <Stack screenOptions={{
      headerRight: () => <HomeBtn />,
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
