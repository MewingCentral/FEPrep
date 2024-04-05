import { Stack, Slot } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useRouter } from "expo-router";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

import { TRPCProvider } from "~/utils/api";

import "../styles.css";

import { useColorScheme } from "nativewind";

import headerDefault from "~/utils/header-default";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// import DrawerContent from "components/drawer-content";
import DrawerContent from "./components/drawer-content";
import { api } from "~/utils/api";

import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "~/utils/colors";
import { AuthProvider } from "~/utils/auth";
import { useAuth } from "~/utils/auth";
import { RadixIcon } from "radix-ui-react-native-icons";

// Drawer stuff
const DrawerLayout = () => {
  return <Slot />;
};

// This is the main layout of the app
// It wraps your pages with the providers they need
export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <AuthProvider>
      <TRPCProvider>
        {/*
          The Stack component displays the current page.
          It also allows you to configure your screens 
        */}
        
        <Stack screenOptions={headerDefault(colorScheme)}>
        <Stack.Screen
        name="dashboard"
        options={{
          ...headerDefault(colorScheme),
          headerRight: () => {
            const { sessionId, setSessionId } = useAuth();
            console.log("Session id in drawer!", sessionId)
            const router = useRouter();
          
            const signOut = api.auth.signOut.useMutation({
                onSuccess: () => {
                    setSessionId("invalid")
                    router.push("/");
                },
                onError: (error) => {
                    // todo make this better??
                    console.log(error);
                }
            });
          
            const onSignOut = () => {
                signOut.mutate();
            };

            return (
              <View>
                {
                  sessionId !== "invalid" && (
                  <Pressable style={[styles.logoutContainer]} onPress={onSignOut}>
                    <RadixIcon name="exit" color={Colors.dark_primary_text} />
                  </Pressable> )
                }
              </View>
            );
          },
        }} />
        <Stack.Screen
          name="card-creation"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
        <StatusBar />
      </TRPCProvider>
    </AuthProvider>

  );
}

const styles = StyleSheet.create({
  logoutContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 5,
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  // logoutText: {
  //   alignSelf: "center",
  //   color: Colors.dark_primary_text,
  //   textAlign: "center",
  // },
});
