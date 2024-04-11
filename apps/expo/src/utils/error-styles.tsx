import { StyleSheet } from "react-native";

import Colors from "./colors";

const errorStyles = StyleSheet.create({
  errorText: {
    color: Colors.error_text,
  },
  darkModeErrorText: {
    margin: 20,
    color: Colors.dark_primary_text,
  }
});

export default errorStyles;
