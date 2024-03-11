import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
// import { useColorScheme } from "nativewind";
import Colors from "../../utils/colors";

import { TRPCProvider } from "../../utils/api";

export default function dashboardLayout() {
  // const { colorScheme } = useColorScheme();
  return (
    <TRPCProvider>
      {/*
            The Stack component displays the current page.
            It also allows you to configure your screens 
          */}
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.dark_sec,
          },
          contentStyle: {
            backgroundColor: Colors.dark_bg,
          },
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
