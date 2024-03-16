import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RadixIcon } from "radix-ui-react-native-icons";

import Colors from "~/utils/colors";
import dashStyles from "~/utils/dash-styles";

export default function Tab() {
  return (
    <SafeAreaView style={[dashStyles.screenContainer, dashStyles.container]}>
      {/* Search input */}
      <View style={{ flexDirection: "row" }}>
        <View style={[dashStyles.container, dashStyles.inputContainer]}>
          <TextInput
            style={[dashStyles.input]}
            placeholder={"Enter set"}
            placeholderTextColor={Colors.dark_secondary_text}
            cursorColor={Colors.dark_primary_text}
          />
          <RadixIcon name="magnifying-glass" color={Colors.dark_primary_text} />
        </View>
      </View>

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
      </View>
    </SafeAreaView>
  );
}
