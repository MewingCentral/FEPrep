import { StyleSheet, KeyboardAvoidingView, Pressable, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { RadixIcon } from "radix-ui-react-native-icons";

import { useRouter } from "expo-router";

import Colors from "~/utils/colors";
import dashStyles from "~/utils/dash-styles";

// Api stuff for log out, might do this somewhere else in the future
import * as SecureStore from "expo-secure-store";
import { api } from "~/utils/api";


export default function Tab() {
  const router = useRouter();
  const signOut = api.auth.signOut.useMutation({
    onSuccess: () => {
      const sessId = SecureStore.getItem("session");
      console.log(`Session ID: ${sessId}`);
      router.push("../");
      const getSess = api.auth.getSession.useQuery();
      // const getSess = api.auth.getSession.useQuery({
      //   onSuccess: (data: ) => {
      //     if (!(data instanceof Error)) {
      //       console.log(data);
      //     }
      //   },
      //   onError: (error) => {
      //     console.log(error);
      //   },
      // });
    },
    onError: (error) => {
      // todo is this necessary?
      console.error(error);
    },
  });

  const onSignOut = () => {
    signOut.mutate();
  }

  return (
    <SafeAreaView style={[dashStyles.screenContainer, dashStyles.container]}>
      <KeyboardAwareScrollView>
        {/* Temp log out button */}
        <Pressable style={tempStyles.pressable} onPress={onSignOut}>
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
