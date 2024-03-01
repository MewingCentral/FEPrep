import { Text, View, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";

export default function HomePage() {
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

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flexWrap: "wrap",
  },
  screenContainer: {
    flex: 1,
    alignContent: "center", // Horizontal alignment of children
    justifyContent: "center", // Vertical alignment of children
  },
  contentContainer: {
    alignSelf: "center",
    gap: 50,
    maxWidth: 305,
    borderRadius: 6,
    backgroundColor: "#f8fafa",
  },
  titleContainer: {
    marginTop: 40,
    marginHorizontal: 20,
    flexWrap: "nowrap",
    gap: 10,
  },
  buttonsContainer: {
    alignSelf: "center",
    marginHorizontal: 20,
    marginBottom: 40,
    gap: 10,
  },
  text: {
    color: "#020817",
    textAlign: "center",
    fontSize: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
  },
  subtitle: {
    lineHeight: 30,
    fontSize: 20,
  },
  buttons: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    minWidth: 70,
    borderRadius: 6,
  },
  signUpBtn: {
    backgroundColor: "#64748b",
  },
  dashboardBtn: {
    backgroundColor: "#0f172a",
  },
  buttonTxt: {
    color: "#f8fafc",
  },
});
