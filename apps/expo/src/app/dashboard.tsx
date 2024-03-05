import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

export default function Dashboard() {
  return (
    <SafeAreaView className="bg-background">
      <Stack.Screen
        options={{
          title: "Dashboard",
        }}
      />
    </SafeAreaView>
  );
}
