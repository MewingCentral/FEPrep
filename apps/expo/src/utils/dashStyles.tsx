import { StyleSheet } from "react-native";

import Colors from "./colors";

const dashStyles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flexWrap: "wrap",
    backgroundColor: Colors.dark_bg,
  },
  screenContainer: {
    flexGrow: 1,
    gap: 30,
    alignContent: "center",
    alignItems: "center",
    backgroundColor: Colors.dark_bg,
  },
  inputContainer: {
    flex: 1,
    alignContent: "stretch",
    marginHorizontal: 20,
  },
  allSetsContainer: {
    gap: 20,
  },
  setContainer: {
    height: 100,
    width: 300,
    backgroundColor: Colors.dark_sec,
    borderColor: "rgba(148, 163, 184, 0.50)",
    borderWidth: 2,
    borderRadius: 6,
  },
  setTextContainer: {
    justifyContent: "space-between",
    height: 100,
  },
  input: {
    color: Colors.dark_primary_text,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark_primary_text,
  },
  titleText: {
    color: Colors.dark_primary_text,
    fontSize: 20,
  },
  setText: {
    margin: 10,
  },
  setTerms: {
    color: Colors.dark_secondary_text,
    fontSize: 16,
  },
});

export default dashStyles;
