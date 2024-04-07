import { KeyboardAvoidingView, Text, TextInput, View, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { RadixIcon } from "radix-ui-react-native-icons";

import Colors from "~/utils/colors";
import dashStyles from "~/utils/dash-styles";
import { useRouteNode } from "expo-router/build/Route";

export default function Tab() {
  // const router = useRouter();
  // const signOut = api.auth.signOut.useMutation({
  //   onSuccess: () => {
  //     SecureStore.setItem("session", "invalid");
  //     router.push("../");
  //   },
  //   onError: (error) => {
  //     // todo is this necessary?
  //     console.error(error);
  //   },
  // });

  // // const getSess = api.auth.getSession.useQuery();

  // const onSignOut = () => {
  //   signOut.mutate();
  //   // console.log(getSess.data);
  // };

  return (
    <SafeAreaView style={[dashStyles.screenContainer, dashStyles.container]}>
      <KeyboardAwareScrollView>
        {/* Search input */}
        <KeyboardAvoidingView style={{ flexDirection: "row", alignItems: "stretch", width: 300 }}>
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
              size={35}
            />
          </View>
        </KeyboardAvoidingView>

        {/* Study Sets */}
        <View style={[dashStyles.container, dashStyles.allSetsContainer]}>
          {/* Individual study set */}
          {/* <View style={[dashStyles.container, dashStyles.setContainer]}>
            <View style={[dashStyles.setTextContainer]}>
              <Text style={[dashStyles.setText, dashStyles.titleText]}>
                Set 1
              </Text>
              <Text style={[dashStyles.setText, dashStyles.setTerms]}>
                15 terms
              </Text>
            </View>
          </View> */}

          {/* Individual study set */}
          {/* <View style={[dashStyles.container, dashStyles.setContainer]}>
            <View style={[dashStyles.setTextContainer]}>
              <Text style={[dashStyles.setText, dashStyles.titleText]}>
                Set 1
              </Text>
              <Text style={[dashStyles.setText, dashStyles.setTerms]}>
                15 terms
              </Text>
            </View>
          </View> */}

          {/* Individual study set */}
          {/* <View style={[dashStyles.container, dashStyles.setContainer]}>
            <View style={[dashStyles.setTextContainer]}>
              <Text style={[dashStyles.setText, dashStyles.titleText]}>
                Set 1
              </Text>
              <Text style={[dashStyles.setText, dashStyles.setTerms]}>
                15 terms
              </Text>
            </View>
          </View> */}

          {/* Individual study set */}
          {/* <View style={[dashStyles.container, dashStyles.setContainer]}>
            <View style={[dashStyles.setTextContainer]}>
              <Text style={[dashStyles.setText, dashStyles.titleText]}>
                Set 1
              </Text>
              <Text style={[dashStyles.setText, dashStyles.setTerms]}>
                15 terms
              </Text>
            </View>
          </View> */}

          {/* Individual study set */}
          {/* <View style={[dashStyles.container, dashStyles.setContainer]}>
            <View style={[dashStyles.setTextContainer]}>
              <Text style={[dashStyles.setText, dashStyles.titleText]}>
                Set 1
              </Text>
              <Text style={[dashStyles.setText, dashStyles.setTerms]}>
                15 terms
              </Text>
            </View>
          </View> */}
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
  },
  delYellowBorder: {
    borderWidth: 1,
    borderColor: "yellow",
  }
});
