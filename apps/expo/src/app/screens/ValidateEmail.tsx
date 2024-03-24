import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";

export default function ValidateEmail() {
  const [authCode, onChangeAuthCode] = React.useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <View style={styles.topContainer}>
            <Text style={styles.verificationHeader}>
              {"Thank you for signing up!\n"}
              <Text style={styles.nestedText}>
                {"Please follow the steps below to verify your account."}
              </Text>
            </Text>
          </View>

          <View style={styles.welcomeContainer}>
            <Text style={styles.nestedText}>
              {"An 8 digit verification code was just sent to your "}
              {"UCF email address. Please enter the code below too "}
              {"verify your student account."}
            </Text>

            <Text style={styles.verificationIdentifiedText}>
              {"Enter Verification Code"}{" "}
            </Text>
            <TextInput
              style={styles.verificationTextField}
              onChangeText={onChangeAuthCode}
              value={authCode}
              placeholder=""
              keyboardType="numeric"
            />
          </View>

          <View style={styles.bottomContainer}>
            <Pressable style={styles.submitBtn} onPress={() => null}>
              <Text style={styles.submitBtnText}> {"Submit"} </Text>
            </Pressable>
          </View>
          <StatusBar style="auto" />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f8fafa",
  },
  topContainer: {
    flex: 2,
    backgroundColor: "#f8fafa",
    padding: 20,
  },
  welcomeContainer: {
    flex: 4,
    alignSelf: "center",
    width: "85%",
    backgroundColor: "#f8fafa",
    padding: 20,
  },
  bottomContainer: {
    flex: 2,
    backgroundColor: "#f8fafa",
    padding: 20,
  },
  topContainerText: {
    fontSize: 22,
    color: "#020817",
    alignSelf: "flex-end",
  },
  verificationHeader: {
    color: "#020817",
    fontSize: 24,
    fontWeight: "500",
    alignSelf: "center",
    paddingTop: 20,
    paddingBottom: 50,
  },
  nestedText: {
    color: "#020817",
    fontSize: 14,
    position: "relative",
    verticalAlign: "bottom",
    paddingVertical: 20,
    alignSelf: "center",
    textAlign: "center",
    letterSpacing: 0.25,
  },
  verificationTextField: {
    color: "black",
    height: 40,
    margin: 12,
    borderColor: "#CBD5E1",
    borderWidth: 1.25,
    borderRadius: 6,
    padding: 10,
  },
  verificationIdentifiedText: {
    color: "#020817",
    fontSize: 14,
    fontWeight: "500",
    position: "relative",
    alignSelf: "flex-start",
    paddingLeft: 8,
    letterSpacing: 0.25,
  },
  submitBtn: {
    backgroundColor: "#0F172A",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 7,
    width: "75%",
  },
  submitBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 21,
    letterSpacing: 0.25,
  },
});
