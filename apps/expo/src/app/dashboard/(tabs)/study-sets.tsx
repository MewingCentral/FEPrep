import { useState } from "react";
import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useRouter } from "expo-router";
import { RadixIcon } from "radix-ui-react-native-icons";

import { api, RouterOutputs } from "~/utils/api";
import Colors from "~/utils/colors";
import dashStyles from "~/utils/dash-styles";

function Pack({
  pack,
}: {
  pack: RouterOutputs["flashcards"]["allPublicPacks"][number];
}) {
  const router = useRouter();

  return (
    <Pressable
      style={[dashStyles.container, dashStyles.setContainer]}
      onPress={() => {
        router.push({
          pathname: "../../card-screens/study",
          params: { pId: pack.id, pName: pack.name },
        });
      }}
    >
      <View style={[styles.setContentsContainer]}>
        <View style={[styles.setTextContainer]}>
          <Text style={[dashStyles.setText, dashStyles.titleText]}>
            {pack.name}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

function Packs() {
  const packs = api.flashcards.allPublicPacks.useQuery();

  // Refetch packs on focus
  useFocusEffect(() => {
    void packs.refetch();
  });

  // TODO error text
  if (packs.isLoading) {
    return <Text>Loading...</Text>;
  }

  if (packs.isError) {
    return <Text>Oops... There was an issue loading your packs</Text>;
  }

  if (!packs.data?.length) {
    return <Text>You have no packs</Text>;
  }

  return (
    <View>
      <SearchPacks packs={packs.data} />
    </View>
  );
}

function SearchPacks({
  packs,
}: {
  packs: RouterOutputs["flashcards"]["allPublicPacks"];
}) {
  const [searchInput, setSearchInput] = useState("");
  console.log("search input: ", searchInput);

  const filteredPacks = packs.filter((pack) => {
    return pack.name.toLowerCase().includes(searchInput.toLowerCase());
  });

  console.log("filtered packs: ", filteredPacks);

  return (
    <View>
      <KeyboardAvoidingView style={[styles.searchContainer]}>
        <View style={[dashStyles.container, dashStyles.inputContainer]}>
          <TextInput
            style={[dashStyles.input]}
            placeholder={"Enter set"}
            placeholderTextColor={Colors.dark_secondary_text}
            cursorColor={Colors.dark_primary_text}
            keyboardType="default"
            onChangeText={(value) => {
              console.log("Typing something");
              setSearchInput(value);
            }}
            value={searchInput}
          />
          <Pressable
            onPress={() => {
              console.log(searchInput);
            }}
          >
            <RadixIcon
              name="magnifying-glass"
              color={Colors.dark_primary_text}
              size={35}
            />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
      <View style={[styles.setsContainer]}>
        {filteredPacks.map((pack) => (
          <View style={[styles.setContentsContainer]} key={pack.id}>
            <Pack pack={pack} />
          </View>
        ))}
      </View>
    </View>
  );
}

export default function Tab() {
  return (
    <SafeAreaView style={[dashStyles.container, dashStyles.screenContainer]}>
      <KeyboardAwareScrollView
        style={[dashStyles.outer]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[dashStyles.container, dashStyles.allSetsContainer]}>
          <Packs />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    marginTop: 20,
  },
  setsContainer: {
    gap: 15,
  },
  setContentsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 130,
  },
  setTextContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  errorTxt: {
    fontSize: 20,
    marginTop: 30,
    textAlign: "center",
    color: Colors.dark_primary_text,
  },
  deleteYellowBorder: {
    borderWidth: 1,
    borderColor: "yellow",
  },
});
