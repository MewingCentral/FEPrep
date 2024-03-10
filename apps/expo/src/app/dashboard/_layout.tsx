import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { TRPCProvider } from "../../utils/api";

import { useColorScheme } from "nativewind";

export default function dashboardLayout() {
    const { colorScheme } = useColorScheme();
    return (
      <TRPCProvider>
        {/*
            The Stack component displays the current page.
            It also allows you to configure your screens 
          */}
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: colorScheme == "dark" ? "#1e293b" : "#f1f5f9",
            },
            contentStyle: {
              backgroundColor: colorScheme == "dark" ? "#020817" : "#F8FAFC",
            },
          }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false,}} />
        </Stack>
        <StatusBar />
      </TRPCProvider>
    );
  }