import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { Colors } from "react-native/Libraries/NewAppScreen";

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
      <Stack screenOptions={{
        ...headerDefault(colorScheme),
        // contentStyle: {
        //   backgroundColor: Colors.dark_bg,
        // },
      }}>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            headerTintColor: "yellow",
          }}
        />
      </Stack>
      <StatusBar />
    </TRPCProvider>
  );
}
