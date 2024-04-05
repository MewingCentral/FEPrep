import { Stack } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { Button } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { TRPCProvider } from "~/utils/api";
import headerDefault from "~/utils/header-default";

// todo delete above if necessary

export default function DashboardLayout() {
  const { colorScheme } = useColorScheme();
  return (
    <TRPCProvider>
      {/*
            The Stack component displays the current page.
            It also allows you to configure your screens 
          */}
      {/* <Stack screenOptions={headerDefault(colorScheme)}> */}
      {/* didn't work */}
      <Stack screenOptions={headerDefault(colorScheme)}>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar />
    </TRPCProvider>
  );
}
