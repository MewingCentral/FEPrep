import { router, Stack, useRouter } from "expo-router";

import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";

import { TRPCProvider } from "~/utils/api";

import "../styles.css";

import { Pressable, StyleSheet, View } from "react-native";
import { useColorScheme } from "nativewind";
import { RadixIcon } from "radix-ui-react-native-icons";

import { api } from "~/utils/api";
import { AuthProvider, useAuth } from "~/utils/auth";
import Colors from "~/utils/colors";
import headerDefault from "~/utils/header-default";

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
              headerLeft: () => {
                // eslint-disable-next-line
                const { sessionId } = useAuth();

                return (
                  <View style={{ marginRight: 30 }}>
                    {sessionId !== "invalid" ? null : <BackBtn />}
                  </View>
                );
              },
              headerRight: () => {
                // eslint-disable-next-line
                const { sessionId, setSessionId } = useAuth();
                // eslint-disable-next-line
                const router = useRouter();

                const signOut = api.auth.signOut.useMutation({
                  onSuccess: () => {
                    setSessionId("invalid");
                    router.push("/");
                  },
                  onError: (error) => {
                    // todo make this better??
                    console.log(error);
                  },
                });

                const onSignOut = () => {
                  signOut.mutate();
                };

                return (
                  <View>
                    {sessionId !== "invalid" && (
                      <Pressable
                        style={[styles.logoutContainer]}
                        onPress={onSignOut}
                      >
                        <RadixIcon
                          name="exit"
                          color={Colors.dark_primary_text}
                        />
                      </Pressable>
                    )}
                  </View>
                );
              },
            }}
          />
          <Stack.Screen
            name="card-screens"
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

function BackBtn() {
  return (
    <Pressable
      onPress={() => {
        router.back();
      }}
    >
      <RadixIcon name="arrow-left" color={Colors.dark_primary_text} />
    </Pressable>
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
});
