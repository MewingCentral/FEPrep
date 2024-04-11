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
import * as SecureStore from "expo-secure-store";
import { RadixIcon } from "radix-ui-react-native-icons";

import { api, RouterOutputs } from "~/utils/api";
import Colors from "~/utils/colors";
import dashStyles from "~/utils/dash-styles";
import errorStyles from "~/utils/error-styles";

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
    return <Text style={[errorStyles.loadingText]}>Loading...</Text>;
  }

  if (packs.isError) {
    return (
      <Text style={[errorStyles.darkModeErrorText]}>
        Oops... There was an issue loading your packs
      </Text>
    );
  }

  if (!packs.data?.length) {
    console.log("length is baddddd");
    return (
      <Text style={[errorStyles.darkModeErrorText]}>
        No public packs exist yet!
      </Text>
    );
  }

  console.log("made it here!!! THIS SHOULD ALWAYS HAPPEN");

  return (
    <View style={{ paddingBottom: 50 }}>
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

  console.log(
    packs.filter((pack) => {
      return pack.name.toLowerCase().includes(searchInput.toLowerCase());
    }),
  );

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
      {/* {filteredPacks.length === 0 ? (
      <View style={[styles.setsContainer]}>
        <Text style={{color: "white"}}>No results found</Text>
      </View>
    ) : (
      <View style={[styles.setsContainer]}>
        {filteredPacks.map((pack) => (
          <View style={[styles.setContentsContainer]} key={pack.id}>
            <Pack pack={pack} />
          </View>
        ))}
      </View>
    )} */}
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
  const session = SecureStore.getItem("session");
  const loggedIn = session === "invalid" ? false : true;
  const [popupVisible, setPopupVisible] = useState(!loggedIn);

  console.log("logged in? ", loggedIn);
  console.log("session: ", session);
  console.log("show popup? ", popupVisible);

  return (
    <SafeAreaView style={[dashStyles.container, dashStyles.screenContainer]}>
      <KeyboardAwareScrollView
        style={[dashStyles.outer]}
        keyboardShouldPersistTaps="handled"
      >
        {/* Make an account to create sets popup */}
        {popupVisible && (
          <View style={[styles.popupContainer]}>
            <View style={[styles.popupCloseBtnContainer]}>
              <Pressable
                onPress={() => {
                  setPopupVisible(false);
                }}
              >
                <RadixIcon
                  name="cross-circled"
                  color={Colors.dark_secondary_text}
                />
              </Pressable>
            </View>
            <View style={[styles.popupTextContainer]}>
              <Text style={[styles.popupText]}>
                Create an account to make your own study sets!
              </Text>
            </View>
          </View>
        )}

        <View style={[dashStyles.container, dashStyles.allSetsContainer]}>
          <View style={{ height: 0, width: 300 }}></View>
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
  popupContainer: {
    flexDirection: "column",
    borderColor: Colors.dark_secondary_text,
    borderRadius: 10,
    backgroundColor: Colors.light_sec,
    marginTop: 15,
    padding: 10,
    gap: 10,
  },
  popupCloseBtnContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  popupTextContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  setsContainer: {
    gap: 15,
    alignItems: "center",
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
  popupText: {
    fontSize: 20,
    color: Colors.light_primary_text,
    textAlign: "center",
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
