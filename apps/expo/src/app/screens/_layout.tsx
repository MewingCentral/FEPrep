import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="ValidateEmail"
        options={{
          presentation: "modal",
          headerShown: false,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="VerificationModal"
        options={{
          presentation: "modal",
          headerShown: false,
          headerBackTitleVisible: false,
        }}
      />   
      <Stack.Screen
        name="Login"
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Register"
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="ForgotPswd"
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
        }}
      />
    </Stack>
  );
}
