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
                placeholder='NID'
                keyboardType="default"
              />
              <Text style={styles.inputIdentifierText}> Password </Text>
              <TextInput
                style={styles.pswdTextField}
                onChangeText={onChangePassword}
                value={password}
                placeholder="Password"
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
                  {"Sign up"} 
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

////////////////////  definitely being used  ////////////////////  

/*
 * 3 containers to separate the page & 1 container that 
 * they are all being stored in. all 4 are being used.
 */
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

/*
 * TOP CONTAINER: all items are definitely in use.
 */
  topContainerText: {
    fontSize: 22,
    fontWeight: '500',
    color: "black",
    alignSelf: "flex-end",
  },

/*
 * WELCOME CONTAINER
 */
  header: {
    fontSize: 24,
    alignSelf: "center",
    paddingBottom: 20,
  },
  nidTextField: {
    height: 40,
    margin: 12,
    borderWidth: 1.25,
    borderRadius: 6,
    padding: 10,
    color: "black",
  },
  pswdTextField: {
    height: 40,
    margin: 12,
    borderWidth: 1.25,
    borderRadius: 6,
    padding: 10,
    color: "black",
  },
  inputIdentifierText: {
    fontSize: 14,
    position: "relative",
    alignSelf: 'flex-start',
    paddingLeft: 8,
    letterSpacing: 0.25,
    color: 'black'
  },
  forgotPswdLink: {
    textDecorationLine: 'underline',
    alignSelf: "flex-end",
    paddingRight: 9,
  },

/*
 * LOGIN CONTAINER: all items are definitely in use.
 */
  loginBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 6,
    width: "75%",
    backgroundColor: '#0f172a',
  },
  loginBtnText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  contentText: {
    fontSize: 14,
    position: "relative",
    verticalAlign: "bottom",
    paddingVertical: 20,
    alignSelf: 'center',
    letterSpacing: 0.25,
    color: 'black'
  },
  signUpLink: {
    textDecorationLine: 'underline',
  },
});
