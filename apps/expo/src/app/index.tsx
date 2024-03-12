import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";

export default function HomePage() {
  return (
    <SafeAreaView style={[styles.container, styles.screenContainer]}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      {/* Title and subtitle */}
      <View style={[styles.container, styles.contentContainer]}>
        <View style={[styles.container, styles.titleContainer]}>
          <Text style={[styles.text, styles.title]}>FEPrep</Text>
          <Text style={[styles.text, styles.subtitle]}>
            A new way to prepare for the Foundation Exam.
          </Text>
        </View>

        {/* Buttons */}
        <View style={[styles.container, styles.buttonsContainer]}>
          <Link
            style={[styles.buttons, styles.signUpBtn]}
            href="/screens/Register"
            asChild
          >
            <Pressable>
              <Text style={[styles.text, styles.buttonTxt]}>Register</Text>
            </Pressable>
          </Link>
          <Text style={[styles.text]}>or</Text>
          <Link
            style={[styles.buttons, styles.dashboardBtn]}
            href="/dashboard/(tabs)/studySets"
            asChild
          >
            <Pressable>
              <Text style={[styles.text, styles.buttonTxt]}>
                Start Practicing
              </Text>
            </Pressable>
          </Link>
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
