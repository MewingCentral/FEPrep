import { StyleSheet, KeyboardAvoidingView, Pressable, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { RadixIcon } from "radix-ui-react-native-icons";

import { useRouter } from "expo-router";

import Colors from "~/utils/colors";
import dashStyles from "~/utils/dash-styles";

export default function Tab() {
  const router = useRouter();

  return (
    <SafeAreaView style={[dashStyles.screenContainer, dashStyles.container]}>
      <KeyboardAwareScrollView>
        {/* Temp log out button */}
        <Pressable style={tempStyles.pressable} onPress={() => {
          router.push("../../index");
        }}>
          <Text style={tempStyles.text}>Log out</Text>
        </Pressable>

        {/* Search input */}
        <KeyboardAvoidingView style={{ flexDirection: "row" }}>
          <View style={[dashStyles.container, dashStyles.inputContainer]}>
            <TextInput
              style={[dashStyles.input]}
              placeholder={"Enter set"}
              placeholderTextColor={Colors.dark_secondary_text}
              cursorColor={Colors.dark_primary_text}
            />
            <RadixIcon
              name="magnifying-glass"
              color={Colors.dark_primary_text}
            />
          </View>
        </KeyboardAvoidingView>

        {/* Study sets */}
        <View style={[dashStyles.container, dashStyles.allSetsContainer]}>
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
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const tempStyles = StyleSheet.create({
  pressable: {
    height: 50,
    backgroundColor: Colors.dark_accent,
    flex: 1,
    justifyContent: "center",
    marginBottom: 10,
  },
  text: {
    textAlign: "center",
    color: Colors.dark_primary_text,
  }
});
