import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className=" bg-background">
      <View>
        <Text className="text-center text-4xl font-bold text-primary">
          Welcome to expo!
        </Text>
        <Text className="text-center text-2xl font-bold text-primary">
          This is a page from the expo app
        </Text>
      </View>
    </SafeAreaView>
  );
}
