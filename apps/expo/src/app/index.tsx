import { Text, View, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="bg-background">
      <View>
        <Text className="text-center text-4xl font-bold text-primary">
          FEPrep
        </Text>
        <Text className="text-center text-2xl font-bold text-primary">
          A new way to prepare for the Foundation Exam.
        </Text>
        <View className="flex flex-col gap-5">
          <Button title="Start Practicing" color="#0F172A" 
            accessibilityLabel="Access the dashboard without logging in.">
          </Button>
          <Button title="Create an Account" color="#64748B"
            accessibilityLabel="Create an account to access all FEPrep features.">
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
