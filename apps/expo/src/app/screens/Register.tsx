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
import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { api } from "~/utils/api";
import * as SecureStore from "expo-secure-store";
import { useForm, Controller } from "react-hook-form";
import { SignUpFormSchema, SignUpFormInput } from "../../../../../packages/validators/src";
import { zodResolver } from '@hookform/resolvers/zod';

// todo change func title
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

  const onSubmit = async (values: SignUpFormInput) => {
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
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <View style={styles.topContainer}>
            <Text style={styles.topContainerText}> FEPrep</Text>
          </View>

          <View style={styles.welcomeContainer}>
            <Text style={styles.header}>{"Create an Account"}</Text>
            <Text style={styles.subheaderText}>
              {"Enter your NID to create your account. \n"}
            </Text>

            <Text style={styles.inputIdentifierText}> NID </Text>
            <Controller control={control} name="nid" 
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
          </View>

          <View style={styles.bottomContainer}>
            <Pressable style={styles.loginBtn} onPress={handleSubmit(onSubmit)}>
              <Text style={styles.loginBtnText}> {"Sign Up"} </Text>
            </Pressable>
            <Text style={styles.contentText}>
              {"Have an account already? "}
              <Link style={styles.signUpLink} href="/screens/Login">
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f8fafa",
  },
  topContainer: {
    flex: 0.5,
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
    fontWeight: "500",
    color: "#020817",
    alignSelf: "flex-end",
  },
  header: {
    color: "#020817",
    fontSize: 28,
    fontWeight: "500",
    alignSelf: "center",
    paddingBottom: 7.5,
  },
  subheaderText: {
    color: "#6E727C",
    fontSize: 12,
    position: "relative",
    paddingBottom: 20,
    alignSelf: "center",
    letterSpacing: 0.25,
  },
  nidTextField: {
    color: "black",
    fontSize: 12,
    height: 40,
    margin: 12,
    borderColor: "#CBD5E1",
    borderWidth: 1.25,
    borderRadius: 6,
    padding: 10,
  },
  pswdTextField: {
    color: "black",
    fontSize: 12,
    height: 40,
    margin: 12,
    borderColor: "#CBD5E1",
    borderWidth: 1.25,
    borderRadius: 6,
    padding: 10,
  },
  confirmPswdTextField: {
    color: "black",
    fontSize: 12,
    height: 40,
    margin: 12,
    borderColor: "#CBD5E1",
    borderWidth: 1.25,
    borderRadius: 6,
    padding: 10,
  },
  inputIdentifierText: {
    color: "#020817",
    fontSize: 14,
    fontWeight: "500",
    position: "relative",
    alignSelf: "flex-start",
    paddingLeft: 10,
    paddingTop: 4,
    letterSpacing: 0.25,
  },
  loginBtn: {
    backgroundColor: "#0F172A",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 7,
    width: "75%",
  },
  loginBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 21,
    letterSpacing: 0.25,
  },
  contentText: {
    color: "#020817",
    fontSize: 12,
    position: "relative",
    padding: 20,
    alignSelf: "center",
    letterSpacing: 0.25,
  },
  signUpLink: {
    textDecorationLine: "underline",
    color: "#020817",
    fontWeight: "500",
  },
});
