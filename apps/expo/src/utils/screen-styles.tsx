import { StyleSheet } from "react-native";

import Colors from "./colors";

const screenStyles = StyleSheet.create({
  outer: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: Colors.light_bg,
  },
  topContainer: {
    flex: 0.75,
    backgroundColor: Colors.light_bg,
    padding: 20,
  },
  welcomeContainer: {
    flex: 4,
    alignSelf: "center",
    width: "85%",
    backgroundColor: Colors.light_bg,
    padding: 20,
  },
  bottomContainer: {
    flex: 1.25,
    backgroundColor: Colors.light_bg,
    padding: 20,
  },
  topContainerText: {
    fontSize: 22,
    fontWeight: "500",
    color: Colors.light_text,
    alignSelf: "flex-end",
  },
  header: {
    fontSize: 24,
    fontWeight: "500",
    color: Colors.light_text,
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
  pswdInputContainer: {
    flex: 1,
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
    color: Colors.light_text,
    fontSize: 14,
    fontWeight: "500",
    position: "relative",
    alignSelf: "flex-start",
    paddingLeft: 8,
    letterSpacing: 0.25,
  },
  forgotPswdLink: {
    textDecorationLine: "underline",
    color: Colors.light_text,
    alignSelf: "flex-end",
    paddingRight: 9,
  },
  loginBtn: {
    backgroundColor: Colors.light_primary_text,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 7,
    width: "75%",
  },
  loginBtnText: {
    color: Colors.light_btn_text,
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 21,
    letterSpacing: 0.25,
  },
  contentText: {
    color: Colors.light_text,
    fontSize: 14,
    position: "relative",
    verticalAlign: "bottom",
    paddingVertical: 20,
    alignSelf: "center",
    textAlign: "center",
    letterSpacing: 0.25,
  },
  hyperlinkText: {
    textDecorationLine: "underline",
    color: Colors.light_text,
    fontWeight: "500",
  },
  subheaderText: {
    color: Colors.light_subheader_text,
    fontSize: 12,
    position: "relative",
    paddingBottom: 20,
    alignSelf: "center",
    letterSpacing: 0.25,
  },
});

export default screenStyles;
