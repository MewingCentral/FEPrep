import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { TRPCProvider } from "~/utils/api";
// import { useColorScheme } from "nativewind";
import Colors from "~/utils/colors";


import "../styles.css";

import { useColorScheme } from "nativewind";

import Colors from "~/utils/colors";

// This is the main layout of the app
// It wraps your pages with the providers they need
export default function RootLayout() {
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
            backgroundColor:
              colorScheme == "dark" ? Colors.dark_sec : Colors.light_sec,
          },
          contentStyle: {
            backgroundColor: Colors.dark_bg,
          },
          headerTintColor:
            colorScheme == "dark"
              ? Colors.dark_primary_text
              : Colors.light_primary_text,
        }}
      >
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
