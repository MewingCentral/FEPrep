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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Link, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { api } from "~/utils/api";
import { useAuth } from "~/utils/auth";
import Colors from "~/utils/colors";
import errorStyles from "~/utils/error-styles";
import screenStyles from "~/utils/screen-styles";
import {
  SignUpFormInput,
  SignUpFormSchema,
} from "../../../../../packages/validators/src";

export default function Register() {
  const { setSessionId } = useAuth();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      nid: "",
      password: "",
    },
  });

  console.log(errors);

  const signUp = api.auth.signUp.useMutation({
    onSuccess: (data) => {
      if (!(data instanceof Error)) {
        SecureStore.setItem("session", data.session);
        SecureStore.setItem("userId", data.userId);
        setSessionId(data.session);
        router.push("../dashboard/(tabs)/study-sets/");
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = (values: SignUpFormInput) => {
    signUp.mutate(values);
  };

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={screenStyles.outer}
    >
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
              <Controller
                control={control}
                name="nid"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={screenStyles.nidTextField}
                    placeholder=""
                    keyboardType="default"
                    cursorColor={Colors.light_primary_text}
                    onChangeText={(value) => onChange(value)}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
              />
              {errors.nid?.message && (
                <Text style={[errorStyles.errorText]}>
                  {errors.nid?.message}
                </Text>
              )}

              <Text style={screenStyles.inputIdentifierText}> Password </Text>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={screenStyles.pswdTextField}
                    placeholder=""
                    keyboardType="default"
                    cursorColor={Colors.light_primary_text}
                    onChangeText={(value) => onChange(value)}
                    onBlur={onBlur}
                    value={value}
                    secureTextEntry
                  />
                )}
              />
              {errors.password?.message && (
                <Text style={[errorStyles.errorText]}>
                  {errors.password?.message}
                </Text>
              )}
            </View>

            <View style={screenStyles.bottomContainer}>
              <Pressable
                style={screenStyles.loginBtn}
                onPress={handleSubmit(onSubmit)}
              >
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
    </KeyboardAwareScrollView>
  );
}
