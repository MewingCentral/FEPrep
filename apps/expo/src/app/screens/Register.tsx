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

import { api } from "~/utils/api";
import * as SecureStore from "expo-secure-store";
import { useForm, Controller } from "react-hook-form";
import { SignUpSchema, SignUpInput } from "../../../../../packages/validators/src"

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    schema: SignUpSchema
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signUp = api.auth.signUp.useMutation({
    onSuccess: (data) => {
      if (!(data instanceof Error)) {
        console.log(data.session);
      }
    },
  });

  const onSubmit = async (values: SignUpInput) => {
    try {
      await signUp(values);

    } catch {
      // hehe
    }
  };

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

          <View style={styles.bottomContainer}>
            <Pressable style={styles.loginBtn} onPress={handleSubmit(signUp)}>
              <Text style={styles.loginBtnText}> {"Sign Up"} </Text>
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
