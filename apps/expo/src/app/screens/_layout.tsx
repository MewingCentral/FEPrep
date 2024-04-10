import { Stack } from "expo-router";
import Colors from "~/utils/colors";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="ValidateEmail"
        options={{
          presentation: "modal",
          headerShown: false,
          headerBackTitleVisible: false,
          statusBarColor: Colors.dark_secondary_text,
        }}
      />
      <Stack.Screen
        name="VerificationModal"
        options={{
          presentation: "modal",
          headerShown: false,
          headerBackTitleVisible: false,
          statusBarColor: Colors.dark_secondary_text,
        }}
      />
      <Stack.Screen
        name="Login"
        options={{
          headerBackTitleVisible: false,
          statusBarColor: Colors.dark_secondary_text,
        }}
      />
      <Stack.Screen
        name="Register"
        options={{
          headerBackTitleVisible: false,
          statusBarColor: Colors.dark_secondary_text,
        }}
      />
      <Stack.Screen
        name="ForgotPswd"
        options={{
          headerBackTitleVisible: false,
          statusBarColor: Colors.dark_secondary_text,
        }}
      />
    </Stack>
  );
}
