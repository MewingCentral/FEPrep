import { Button } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack, useNavigation } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";

import { TRPCProvider } from "~/utils/api";
import { useAuth } from "~/utils/auth";
import headerDefault from "~/utils/header-default";

// todo delete above if necessary

export default function DashboardLayout() {
  const { colorScheme } = useColorScheme();
  // const navigation = useNavigation();

  // const { sessionId } = useAuth();
  // if (sessionId !== "invalid") {
  //   console.log("KILL");
  //   navigation.setOptions({
  //     headerLeft: () => null,
  //   });
  // }

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
            headerTintColor: "yellow",
          }}
        />
      </Stack>
      <StatusBar />
    </TRPCProvider>
  );
}
