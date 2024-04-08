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
import { Link, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { RadixIcon } from "radix-ui-react-native-icons";

import { api } from "~/utils/api";
import Colors from "~/utils/colors";
import dashStyles from "~/utils/dash-styles";

function Pack({ packName, packId }: { packName: string; packId: number }) {
  const router = useRouter();

  const deletePack = api.flashcards.deletePack.useMutation({
    onSuccess: () => {
      console.log("successfully deleted pack ", packId);
    },
    onError: (error) => {
      console.error(error);
    }
  });

  const onDelete = () => {
    deletePack.mutate(packId);
  };

  return (
    <Pressable
      style={[dashStyles.container, dashStyles.setContainer]}
      onPress={() => {
        router.push({
          pathname: "../../card-screens/study",
          params: { pId: packId, pName: packName },
        });
      }}
    >
      <View style={[styles.setContentsContainer]}>
        <Text style={[dashStyles.setText, dashStyles.titleText]}>
          {packName}
        </Text>
        <View style={[styles.setBtnsContainer]}>
          <Pressable onPress={() => {
            router.push({
              pathname: "../../card-screens/update",
              params: { pId: packId, pName: packName },
            });
          }}>
            <RadixIcon name="pencil-2" color={Colors.dark_secondary_text} size={30} />
          </Pressable>
          <Pressable onPress={onDelete}>
            <RadixIcon name="trash" color={Colors.dark_secondary_text} size={33} />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

export default function Tab() {
  const userId = SecureStore.getItem("userId");
  console.log("retrieving cards for user: ", userId);

  const packs = userId ? api.flashcards.readPack.useQuery(userId) : "";

  // todo style error message.
  const userCards =
    packs && packs.data && !packs.isLoading && !packs.isError ? (
      packs.data.map((item) => (
        <Pack packName={item.name} packId={item.id} key={item.id} />
      ))
    ) : (
      <View>
        <Text style={[styles.errorTxt]}>Error loading custom sets.</Text>
      </View>
    );

  return (
    <SafeAreaView style={[dashStyles.container, dashStyles.screenContainer]}>
      <KeyboardAwareScrollView>
        {/* Search input */}
        <KeyboardAvoidingView
          style={[{ flexDirection: "row", alignItems: "stretch" }]}
        >
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

        {/* Study sets */}
        <View style={[dashStyles.container, dashStyles.allSetsContainer]}>
          {/* Create new set button */}
          <Link
            style={[styles.createSetButton]}
            href="../../card-screens/create"
            asChild
          >
            <Pressable>
              <Text style={[dashStyles.titleText]}>Create set</Text>
              <Text style={[dashStyles.titleText]}>+</Text>
            </Pressable>
          </Link>

          {userCards}
        </View>
      </KeyboardAwareScrollView>
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
  setContentsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  setBtnsContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingVertical: 5,
    paddingRight: 5,
    height: 100,
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
