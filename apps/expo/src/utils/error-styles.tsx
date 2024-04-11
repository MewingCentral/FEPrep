import { StyleSheet } from "react-native";

import Colors from "./colors";

const errorStyles = StyleSheet.create({
  errorTextContainer: {
    backgroundColor: "white",
    borderRadius: 6,
  },
  screensErrorText: {
    color: Colors.error_text,
  },
  errorText: {
    margin: 10,
    fontSize: 20,
    color: Colors.error_text,
  },
  darkModeErrorText: {
    margin: 10,
    fontSize: 20,
    color: Colors.dark_error_text,
  },
  loadingText: {
    margin: 10,
    fontSize: 20,
    color: Colors.dark_primary_text,
  },
});

export default errorStyles;
