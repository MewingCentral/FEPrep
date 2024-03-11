import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

import Colors from "~/utils/colors";
import dashStyles from "~/utils/dashStyles";

export default function Tab() {
  return (
    <SafeAreaView style={[dashStyles.container, dashStyles.screenContainer]}>
      {/* Search input */}
      <View style={{ flexDirection: "row" }}>
        <View style={[dashStyles.container, dashStyles.inputContainer]}>
          <TextInput
            style={[dashStyles.input]}
            placeholder={"Enter set"}
            placeholderTextColor={Colors.dark_secondary_text}
            cursorColor={Colors.dark_primary_text}
          />
        </View>
      </View>

      {/* Study sets */}
      <View style={[dashStyles.container, dashStyles.allSetsContainer]}>
        {/* Create new set button */}
        <Link style={[styles.createSetButton]} href="/cardCreation" asChild>
          <Pressable>
            <Text style={[dashStyles.titleText]}>Create set</Text>
            <Text style={[dashStyles.titleText]}>+</Text>
          </Pressable>
        </Link>

        {/* Individual study set */}
        <View style={[dashStyles.container, dashStyles.setContainer]}>
          <View style={[dashStyles.setTextContainer]}>
            <Text style={[dashStyles.setText, dashStyles.titleText]}>
              Set 1
            </Text>
            <Text style={[dashStyles.setText, dashStyles.setTerms]}>
              15 terms
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  createSetButton: {
    height: 60,
    width: 300,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.dark_primary_text,
    borderWidth: 1,
    borderRadius: 6,
  },
});
