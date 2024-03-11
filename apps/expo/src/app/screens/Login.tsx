import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, KeyboardAvoidingView, TextInput, StyleSheet,
  Text, Platform, TouchableWithoutFeedback, Keyboard, 
  SafeAreaView, Pressable } from 'react-native';
import { Link } from "expo-router";

export default function Login () { 
  const [username, onChangeUserName] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        
        <SafeAreaView style={styles.container}>
            <View style={styles.topContainer}>

              <Text style={styles.topContainerText}> FEPrep</Text>
            </View>

            <View style={styles.welcomeContainer}>
              <Text style={styles.header}> 
                Welcome Back! 
              </Text>
              <Text style={styles.contentText}>
                {"Login to begin studying for UCF's Foundation Exam \n"}
              </Text>

              <Text style={styles.inputIdentifierText}> NID </Text>
              <TextInput
                style={styles.nidTextField}
                onChangeText={onChangeUserName}
                value={username}
                placeholder=''
                keyboardType="default"
              />
              
              <Text style={styles.inputIdentifierText}> Password </Text>
              <TextInput
                style={styles.pswdTextField}
                onChangeText={onChangePassword}
                value={password}
                placeholder=""
                keyboardType="default"
              />
              <Link 
                  style={styles.forgotPswdLink}
                  href="/ResetPswd"
                  > {"Forgot Password?"} 
              </Link>
            </View>

            <View style={styles.bottomContainer}> 
              <Pressable style={styles.loginBtn} onPress={() => null}>
                <Text style={styles.loginBtnText}> {"Login"} </Text>
              </Pressable>
              <Text style={styles.contentText}>
                {"Don't have an account? "}
                <Link 
                  style={styles.signUpLink}
                  href="/Register"
                  > 
                  {"Register"} 
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
    flex:.75,
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
    flex: 1.25,
    backgroundColor: "#f8fafa",
    padding: 20,
  },
  topContainerText: {
    fontSize: 22,
    fontWeight: '500',
    color: "#020817",
    alignSelf: "flex-end",
  },
  header: {
    color: "#020817",
    fontSize: 24,
    fontWeight: '500',
    alignSelf: "center",
    paddingBottom: 20,
  },
  nidTextField: {
    color: "black",
    height: 40,
    margin: 12,
    borderColor: "#CBD5E1",
    borderWidth: 1.25,
    borderRadius: 6,
    padding: 10,
  },
  pswdTextField: {
    color: "black",
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
    fontWeight: '500',
    position: "relative",
    alignSelf: 'flex-start',
    paddingLeft: 8,
    letterSpacing: 0.25,
  },
  forgotPswdLink: {
    textDecorationLine: 'underline',
    color: "#020817",
    alignSelf: "flex-end",
    paddingRight: 9,
  },
  loginBtn: {
    backgroundColor: "#0F172A",  
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 7,
    width: "75%",
  },
  loginBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 21,
    letterSpacing: 0.25,
  },
  contentText: {
    color: "#020817",
    fontSize: 14,
    position: "relative",
    verticalAlign: "bottom",
    paddingVertical: 20,
    alignSelf: 'center',
    textAlign: "center",
    letterSpacing: 0.25,
  },
  signUpLink: {
    textDecorationLine: 'underline',
    color: "#020817",
    fontWeight: '500',
  },
});
