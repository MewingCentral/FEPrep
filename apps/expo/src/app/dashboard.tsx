import { StyleSheet, View, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

import { RowsIcon } from "@feprep/ui";
import Colors from "./../utils/colors";

export default function Dashboard() {
  return (
    <SafeAreaView style={[styles.container, styles.screenContainer]}>
      <Stack.Screen
        options={{
          // headerTitle: (props) => <Header />
        }}
      />

      {/* Tabs */}
      <View style={[styles.deleteYellowBorder, styles.container, styles.tabContainer]}>
        <Text style={[styles.deleteYellowBorder, {color: "#ffffff"}]}>TODO: tabs</Text>
        <RowsIcon />
      </View>

      {/* Search bar */}
      <View style={[styles.deleteYellowBorder, styles.container, styles.inputContainer]}>
        <TextInput style={[styles.input]} placeholder={"Enter set"} placeholderTextColor={Colors.dark_primary_text} cursorColor={Colors.dark_primary_text}/>
      </View>

    </SafeAreaView>
  );
}

// function Header(title) {
//   return (
//     <View>
//       <RowsIcon />
//       <Text>{title}</Text>
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flexWrap: "wrap",
  },
  screenContainer: {
    flex: 1,
    gap: 30,
    alignSelf: "center", // Horizontal alignment of children
  },
  tabContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    height: 30,
  },
  inputContainer: {
    alignSelf: "stretch",
  },
  input: {
    color: Colors.dark_primary_text,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark_primary_text,
    marginBottom:4, // delete
  },
  deleteYellowBorder: {
    borderWidth: 1,
    borderColor: "yellow",
  }
});
