import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";

export default function HomePage() {
  return (
    <SafeAreaView className="bg-background">
      <Stack.Screen />
      <View>
        <Text className="text-center text-4xl font-bold text-primary">
          FEPrep
        </Text>
        <Text className="text-center text-2xl font-bold text-primary">
          A new way to prepare for the Foundation Exam.
        </Text>
        <View className="mt-4 flex flex-col gap-6">
          <View className="h-16 bg-foreground">
            <Link href="/dashboard" asChild className="my-auto">
              <Pressable>
                <Text className="text-center text-primary">
                  Start Practicing
                </Text>
              </Pressable>
            </Link>
          </View>
          <View className="h-16 bg-foreground">
            <Link href="/dashboard" asChild className="my-auto">
              <Pressable>
                <Text className="text-center text-primary">
                  Create an Account
                </Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
