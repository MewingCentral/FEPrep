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
import { Link, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { api } from "~/utils/api";
import {
  SignInInput,
  SignInSchema,
} from "../../../../../packages/validators/src";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StatusBar } from "expo-status-bar";

import screenStyles from "~/utils/screen-styles";

export default function Login() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      nid: "",
      password: "",
    },
  });

  console.log(errors);

  const signIn = api.auth.signIn.useMutation({
    onSuccess: (data) => {
      if (!(data instanceof Error)) {
        SecureStore.setItem("session", data.session);
        router.push("../dashboard/(tabs)/study-sets/");
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = (values: SignInInput) => {
    signIn.mutate(values);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={screenStyles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={screenStyles.container}>
          <KeyboardAwareScrollView>
            <View style={screenStyles.topContainer}>
              <Text style={screenStyles.topContainerText}> FEPrep</Text>
            </View>

            <View style={screenStyles.welcomeContainer}>
              <Text style={screenStyles.header}>Welcome Back!</Text>
              <Text style={screenStyles.contentText}>
                {"Login to begin studying for UCF's Foundation Exam \n"}
              </Text>

              <Text style={screenStyles.inputIdentifierText}> NID </Text>
              <Controller
                control={control}
                name="nid"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={screenStyles.nidTextField}
                    placeholder=""
                    keyboardType="default"
                    onChangeText={(value) => onChange(value)}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
              />
              {errors.nid?.message && <Text>{errors.nid?.message}</Text>}
                
                <Text style={screenStyles.inputIdentifierText}> Password </Text>
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={screenStyles.pswdTextField}
                    placeholder=""
                    keyboardType="default"
                    onChangeText={(value) => onChange(value)}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
              />
              {errors.password?.message && (
                <Text>{errors.password?.message}</Text>
              )}

              <Link
                style={screenStyles.forgotPswdLink}
                href="/screens/ForgotPswd"
              >
                {"Forgot Password?"}
              </Link>
            </View>

            <View style={screenStyles.bottomContainer}>
              <Pressable style={screenStyles.loginBtn} onPress={handleSubmit(onSubmit)}>
                <Text style={screenStyles.loginBtnText}> {"Login"} </Text>
              </Pressable>
              <Text style={screenStyles.contentText}>
                {"Don't have an account? "}
                <Link
                  style={screenStyles.hyperlinkText}
                  href="/screens/Register"
                >
                  {"Register"}
                </Link>
              </Text>
            </View>
            <StatusBar style="auto" />
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}