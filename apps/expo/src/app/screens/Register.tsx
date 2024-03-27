import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";

import screenStyles from "~/utils/screen-styles";

export default function Register() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={screenStyles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={screenStyles.container}>
          <View style={screenStyles.topContainer}>
            <Text style={screenStyles.topContainerText}> FEPrep</Text>
          </View>

          <View style={screenStyles.welcomeContainer}>
            <Text style={screenStyles.header}>{"Create an Account"}</Text>
            <Text style={screenStyles.subheaderText}>
              {"Enter your NID to create your account. \n"}
            </Text>

            <Text style={screenStyles.inputIdentifierText}> NID </Text>
            <TextInput
              style={screenStyles.nidTextField}
              placeholder=""
              keyboardType="default"
            />

            <Text style={screenStyles.inputIdentifierText}> Password </Text>
            <TextInput
              style={screenStyles.pswdTextField}
              placeholder=""
              keyboardType="default"
            />

            {/* <Text style={screenStyles.inputIdentifierText}> Confirm Password </Text>
            <TextInput
              style={screenStyles.confirmPswdTextField}
              onChangeText={onChangeConfirmPswd}
              //secureTextEntry={!displayPswd}
              value={confirmPswd}
              placeholder=""
              keyboardType="default"
            /> */}
          </View>

          <View style={screenStyles.bottomContainer}>
            <Pressable style={screenStyles.loginBtn} onPress={() => null}>
              <Text style={screenStyles.loginBtnText}> {"Sign Up"} </Text>
            </Pressable>
            <Text style={screenStyles.contentText}>
              {"Have an account already? "}
              <Link style={screenStyles.hyperlinkText} href="/screens/Login">
                {"Login"}
              </Link>
            </Text>
          </View>
          <StatusBar style="auto" />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
