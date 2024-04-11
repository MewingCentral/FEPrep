import React, { useState } from "react";
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StatusBar } from "expo-status-bar";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import {
  SendResetPasswordEmailInput,
  SendResetPasswordEmailSchema,
} from "@feprep/validators";

import { api } from "~/utils/api";
import Colors from "~/utils/colors";
import errorStyles from "~/utils/error-styles";
import screenStyles from "~/utils/screen-styles";

export default function ForgotPswd() {
  const [emailSent, setEmailSent] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SendResetPasswordEmailSchema),
    defaultValues: {
      nid: "",
    },
  });
  console.log(errors);

  const sendEmail = api.auth.sendResetPassWordEmail.useMutation({
    onSuccess: () => {
      console.log("successfully sent email");
      setEmailSent(true);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = (values: SendResetPasswordEmailInput) => {
    sendEmail.mutate(values);
  };

  return (
    <SafeAreaView style={styles.container}>
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
                <Text style={screenStyles.header}>
                  Enter your NID to reset your password
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
                      autoCapitalize="none"
                      cursorColor={Colors.light_primary_text}
                      onChangeText={(value) => onChange(value)}
                      onBlur={onBlur}
                      value={value}
                    />
                  )}
                />
                {errors.nid?.message && (
                  <Text style={[errorStyles.screensErrorText]}>
                    {errors.nid?.message}
                  </Text>
                )}

                {emailSent && <Text>Check your UCF email!</Text>}
              </View>

              <View style={screenStyles.bottomContainer}>
                <Pressable
                  style={screenStyles.loginBtn}
                  onPress={handleSubmit(onSubmit)}
                >
                  <Text style={screenStyles.loginBtnText}>
                    {" "}
                    {"Send email"}{" "}
                  </Text>
                </Pressable>
              </View>
              <StatusBar style="auto" />
            </SafeAreaView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f8fafa",
  },
  containerText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#020817",
    alignSelf: "center",
  },
});
