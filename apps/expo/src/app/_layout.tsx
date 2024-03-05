import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { TRPCProvider } from "~/utils/api";

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
<<<<<<< HEAD
            backgroundColor:
              colorScheme == "dark" ? Colors.dark_sec : Colors.light_sec,
=======
            backgroundColor: colorScheme == "dark" ? "#1e293b" : "#f1f5f9",
>>>>>>> 32ab6d0 (Temporarily adjusted styling)
          },
          contentStyle: {
            backgroundColor: colorScheme == "dark" ? "#020817" : "#F8FAFC",
          },
          headerTintColor:
            colorScheme == "dark"
              ? Colors.dark_primary_text
              : Colors.light_primary_text,
        }}
<<<<<<< HEAD
      ></Stack>
=======
      >
      </Stack>
>>>>>>> 32ab6d0 (Temporarily adjusted styling)
      <StatusBar />
    </TRPCProvider>
  );
}
