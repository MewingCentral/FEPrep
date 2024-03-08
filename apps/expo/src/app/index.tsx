import { StyleSheet, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";

export default function HomePage() {
  return (
    <SafeAreaView style={[styles.deleteYellowBorder, styles.container, styles.screenContainer]}>
      <Stack.Screen />
      <View style={[styles.deleteYellowBorder, styles.container, styles.contentContainer]}>
        <Text style={[styles.text, styles.title, styles.deleteYellowBorder]}>
          FEPrep
        </Text>
        <Text style={[styles.text, styles.subtitle]}>
          A new way to prepare for the Foundation Exam.
        </Text>
        <View className="mt-4 flex flex-col gap-6">
          <View className="h-16 bg-foreground bg-yellow 500">
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
    alignSelf: "center", // Also necessary for horizontal alignment??
    backgroundColor: "#f8fAfC",
  },
  titleContainer: {

  },
  text: {
    color: "#020817",
    textAlign: "center",
    alignSelf: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 15,
  },
  deleteYellowBorder: {
    borderColor: "yellow",
    borderWidth: 1,
  }
});

// className="text-center text-2xl font-bold text-primary"
