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
import { StatusBar } from "expo-status-bar";

import screenStyles from "~/utils/screen-styles";

import { api } from "~/utils/api";
import * as SecureStore from "expo-secure-store";
import { useForm, Controller } from "react-hook-form";
import { SignUpFormSchema, SignUpInput } from "../../../../../packages/validators/src";
import { zodResolver } from '@hookform/resolvers/zod';

export default function Login() {
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
        console.log(data.session);
      }
    },
  });

  const onChange = arg => {
    return {
      value: arg.nativeEvent.text,
    };
  };

  const onSubmit = async (values: SignUpInput) => {
    try {
      console.log(values);
      await signUp.mutateAsync(values);
      router.push("../dashboard/(tabs)/study-sets");
    } catch {
      // hehe
      console.log("oh no");
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

            <Text style={styles.inputIdentifierText}> NID </Text>
            <Controller control={control} name="nid" 
              // rules={{
              //   required: true,
              //   pattern: /[a-z]{2}[0-9]{6}/,
              // }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.nidTextField}
                  placeholder=""
                  keyboardType="default"
                  onChangeText={value => onChange(value)}
                  onBlur={onBlur}
                  value={value}
                   />
              )} />
            {errors.nid?.message && <Text>{errors.nid?.message}</Text>}

            <Text style={styles.inputIdentifierText}> Password </Text>
            <Controller control={control} name="password"
              // rules={{
              //   required: true,
              //   minLength: 8,
              // }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput 
                  style={styles.pswdTextField}
                  placeholder=""
                  keyboardType="default" 
                  onChangeText={value => onChange(value)}
                  onBlur={onBlur}
                  value={value}
                  />
              )} />
            {errors.password?.message && <Text>{errors.password?.message}</Text>}
            
            {/* <Text style={styles.inputIdentifierText}> Confirm Password </Text>
            <TextInput
              style={screenStyles.confirmPswdTextField}
              onChangeText={onChangeConfirmPswd}
              //secureTextEntry={!displayPswd}
              // value={confirmPswd}
              placeholder=""
              keyboardType="default"
            /> */}
          </View>

          <View style={styles.bottomContainer}>
            <Pressable style={styles.loginBtn} onPress={handleSubmit(onSubmit)}>
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
