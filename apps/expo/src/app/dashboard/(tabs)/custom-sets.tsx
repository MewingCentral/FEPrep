import { useEffect, useState } from "react";
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
import { Link, useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { RadixIcon } from "radix-ui-react-native-icons";

import { RouterOutputs, api } from "~/utils/api";
import Colors from "~/utils/colors";
import dashStyles from "~/utils/dash-styles";

function Pack({ pack }: { pack: RouterOutputs["flashcards"]["readPack"][number] }) {
  const router = useRouter();
  // const updatePacks = useLocalSearchParams();

  // useEffect(() => {
  //   if (updatePacks) {
  //     pack.name = ;
  //   }
  // }, [updatePacks]);

  const utils = api.useUtils();

  const deletePack = api.flashcards.deletePack.useMutation({
    onSuccess: async () => {
      await utils.flashcards.readPack.invalidate();
      console.log("successfully deleted pack ", pack.id);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onDelete = () => {
    deletePack.mutate(pack.id);
  };

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
        <Text style={[dashStyles.setText, dashStyles.titleText]}>
          {pack.name}
        </Text>
        <View style={[styles.setBtnsContainer]}>
          <Pressable
            onPress={() => {
              router.push({
                pathname: "../../card-screens/update",
                params: { pId: pack.id, pName: pack.name, uId: pack.userId },
              });
            }}
          >
            <RadixIcon
              name="pencil-2"
              color={Colors.dark_secondary_text}
              size={30}
            />
          </Pressable>
          <Pressable onPress={onDelete}>
            <RadixIcon
              name="trash"
              color={Colors.dark_secondary_text}
              size={33}
            />
          </Pressable>
        </View>
      </View>
    </Pressable>
  )
}

function Packs() {
  const userId = SecureStore.getItem("userId")!;
  const packs = api.flashcards.readPack.useQuery(userId!, {
    refetchOnMount: true,
  });

  useFocusEffect(() => {
    packs.refetch()
  })

  if (packs.isLoading) {
    return (
      <Text>Loading...</Text>
    )
  }

  if (packs.isError) {
    return (
      <Text>Oops... There was an issue loading your packs</Text>
    )
  }

  if (!packs.data?.length) {
    return <Text>You have no packs</Text>
  }


  return (
    <View>
      {packs.data.map((pack) => (
        <View>
          <Pack pack={pack} key={pack.id} />
        </View>
      ))}
    </View>
  )

}

export default function Tab() {

  // todo style error message.
  // const userPacks =
  //   packs && packs.data && !packs.isLoading && !packs.isError ? (
  //     packs.data.map((item) => (
  //       <Pack pack={item} key={item.id} />
  //     ))
  //   ) : (
  //     <View>
  //       <Text style={[styles.errorTxt]}>Error loading custom sets.</Text>
  //     </View>
  //   );


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

          <Packs />
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
