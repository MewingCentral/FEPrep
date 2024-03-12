import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, KeyboardAvoidingView, TextInput, StyleSheet,
  Text, Platform, TouchableWithoutFeedback, Keyboard, 
  SafeAreaView, Pressable } from 'react-native';
import { Link } from "expo-router";

export default function Login () { 
  const [username, onChangeUserName] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [confirmPswd, onChangeConfirmPswd] = React.useState('');
  
  const [displayPswd, onChangeDisplayPswd] = React.useState(false);

  const swapPswdVisibility = () => {
    onChangeDisplayPswd(!displayPswd);
  };

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
                {"Create an Account"} 
              </Text>
              <Text style={styles.subheaderText}>
                {"Enter your NID to create your account. \n"}
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
                secureTextEntry={!displayPswd}
                value={password}
                placeholder=""
                keyboardType="default"
              />

              <Text style={styles.inputIdentifierText}> Confirm Password </Text>
              <TextInput
                style={styles.confirmPswdTextField}
                onChangeText={onChangeConfirmPswd}
                secureTextEntry={!displayPswd}
                value={confirmPswd}
                placeholder=''
                keyboardType="default"
              />
            </View>

            <View style={styles.bottomContainer}> 
              <Pressable style={styles.loginBtn} onPress={() => null}>
                <Text style={styles.loginBtnText}> {"Sign Up"} </Text>
              </Pressable>
              <Text style={styles.contentText}>
                {"Have an account already? "}
                <Link 
                  style={styles.signUpLink}
                  href="/screens/Login"
                  > 
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
    flex:.5,
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
    fontWeight: '500',
    color: "#020817",
    alignSelf: "flex-end",
  },
  header: {
    color: "#020817",
    fontSize: 28,
    fontWeight: '500',
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
    fontWeight: '500',
    position: "relative",
    alignSelf: 'flex-start',
    paddingLeft: 10,
    paddingTop: 4,
    letterSpacing: 0.25,
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
    fontSize: 12,
    position: "relative",
    padding: 20,
    alignSelf: "center",
    letterSpacing: 0.25,
  },
  signUpLink: {
    textDecorationLine: 'underline',
    color: "#020817",
    fontWeight: '500',
  },
});
