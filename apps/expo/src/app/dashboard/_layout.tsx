import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";

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
