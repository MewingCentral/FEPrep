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
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";

import screenStyles from "~/utils/screen-styles";

export default function Login() {
<<<<<<< HEAD
=======
  
>>>>>>> 1429469 (remove style sheet from Register.tsx and implement screen-styles.tsx instead)
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

<<<<<<< HEAD
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
=======
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
>>>>>>> 1429469 (remove style sheet from Register.tsx and implement screen-styles.tsx instead)

              <Link
                style={screenStyles.forgotPswdLink}
                href="/screens/ForgotPswd"
              >
                {"Forgot Password?"}
              </Link>
            </View>

            <View style={screenStyles.bottomContainer}>
              <Pressable style={screenStyles.loginBtn} onPress={() => null}>
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
<<<<<<< HEAD
              </Text>
            </View>
            <StatusBar style="auto" />
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
=======
              </View>

              <View style={screenStyles.bottomContainer}>
                <Pressable style={screenStyles.loginBtn} onPress={() => null}>
                  <Text style={screenStyles.loginBtnText}> {"Login"} </Text>
                </Pressable>
                <Text style={screenStyles.contentText}>
                  {"Don't have an account? "}
                  <Link style={screenStyles.hyperlinkText} href="/screens/Register">
                    {"Register"}
                  </Link>
                </Text>
              </View>
              <StatusBar style="auto" />
              </KeyboardAwareScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
>>>>>>> 1429469 (remove style sheet from Register.tsx and implement screen-styles.tsx instead)
  );
}
