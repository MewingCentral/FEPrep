import { Text, View, Button, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Link, Stack } from "expo-router";


export default function HomePage() {
  return (
    <SafeAreaView style={{height: 300, borderWidth: 5, borderColor: "yellow"}} className="flex flex-col gap-y-5 bg-background h-lvh">
      <Stack.Screen />
      <View style={{borderWidth: 1, borderColor: "yellow"}} className = "flex flex-col gap-5">
        <Text className="text-center text-4xl font-bold text-primary">
          FEPrep
        </Text>
        <Text className="text-center text-2xl font-bold text-primary">
          A new way to prepare for the Foundation Exam.
        </Text>
        <View style={{borderWidth: 1, borderColor: "yellow"}} className="flex flex-col gap-4">
          <View>
            <Link href="/dashboard" asChild>
              <Pressable>
                <Text className="text-center text-primary">
                Start Practicing
                </Text>
              </Pressable>
            </Link>
            {/* <Button title="Start Practicing" color="#0F172A" 
              accessibilityLabel="Access the dashboard without logging in."
              onPress={() => navigation.navigate('Dashboard')}>
            </Button> */}
          </View>
          <View>
            <Link href="/dashboard" asChild>
              <Pressable>
                <Text className="text-center text-primary">
                Create an Account
                </Text>
              </Pressable>
            </Link>
            {/* <Button title="Create an Account" color="#64748B"
              accessibilityLabel="Create an account to access all FEPrep features.">
            </Button> */}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

