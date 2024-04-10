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
import { Link, useFocusEffect, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { RadixIcon } from "radix-ui-react-native-icons";

import { api, RouterOutputs } from "~/utils/api";
import Colors from "~/utils/colors";
import dashStyles from "~/utils/dash-styles";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateFlashcardPackInput, CreateFlashcardPackSchema } from "@feprep/validators";

import Modal from "react-native-modal";
import modalStyles from "~/utils/modal-styles";

function Pack({
  pack,
}: {
  pack: RouterOutputs["flashcards"]["readPack"][number];
}) {
  const router = useRouter();

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
  );
}

function Packs() {
  const userId = SecureStore.getItem("userId")!;
  const packs = api.flashcards.readPack.useQuery(userId);

  // Refetch packs on focus
  useFocusEffect(() => {
    void packs.refetch();
  });

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
    <View style={[styles.setsContainer]}>
      {packs.data.map((pack) => (
        <View style={[styles.setContentsContainer]} key={pack.id}>
          <Pack pack={pack} />
        </View>
      ))}
    </View>
  );
}

export default function Tab() {
  const [modalVisible, setModalVisible] = useState(false);
  const userId = SecureStore.getItem("userId");
  const router = useRouter();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CreateFlashcardPackSchema),
    defaultValues: {
      name: "",
      userId: userId,
    },
  });
  console.log(errors);

  const utils = api.useUtils();

  const createPack = api.flashcards.createPack.useMutation({
    onSuccess: async (data) => {
      await utils.flashcards.readPacks.invalidate();
      if (!(data instanceof Error)) {
        console.log("my id is ", data[0]!.id);
        router.push({
          pathname: "../../card-screens/update",
          params: { pId: data[0]!.id, pName: data[0]!.name, uId: data[0]!.userId },
        });
      }
      setModalVisible(false);
    },
    onError: (error) => {
      console.error(error);
    }
  });

  const onSubmit = (values: CreateFlashcardPackInput) => {
    console.log(values);
    createPack.mutate(values);
  }

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

        <View>
          <Modal
            isVisible={modalVisible}
            hasBackdrop={true}
            backdropColor="black"
            backdropOpacity={0.7}
            onBackdropPress={() => {
              setModalVisible(false);
              reset();
            }}
          >
            <View style={[modalStyles.container]}>
              <View style={[modalStyles.headerContainer]}>
                <Text style={[modalStyles.headerText]}>New Set</Text>
                <Pressable onPress={() => {
                  setModalVisible(false);
                  reset();
                  }}>
                  <RadixIcon name="cross-circled" size={25} color={Colors.dark_secondary_text} />
                </Pressable>
              </View>
              <View style={[modalStyles.inputContainer]}>
                <Text style={[modalStyles.inputLabel]}>Title</Text>
                <Controller 
                  control={control}
                  name="name"
                  render={({field:{onChange,onBlur,value}}) => (
                    <TextInput
                      style={[modalStyles.inputField]}
                      multiline = {true}
                      placeholder="Enter term"
                      placeholderTextColor={Colors.dark_secondary_text}
                      underlineColorAndroid="transparent"
                      cursorColor={Colors.dark_primary_text}
                      keyboardType="default"
                      onChangeText={(value) => onChange(value)}
                      onBlur={onBlur}
                      value={value}
                    />
                  )}
                />
                {errors.name?.message && <Text style={[modalStyles.inputErrorMsg]}>{errors.name?.message}</Text>}
              </View>

              <View style={[modalStyles.footerBtnsContainer]}>
                <Pressable style={[modalStyles.footerBtn]} onPress={() => {
                  setModalVisible(false);
                  reset();
                  }}>
                  <Text style={[modalStyles.footerBtnText]}>Cancel</Text>
                </Pressable>
                <Pressable style={[modalStyles.footerBtn]} onPress={handleSubmit(onSubmit)}>
                  <Text style={[modalStyles.footerBtnText]}>Create</Text>
                </Pressable>
              </View>          
            </View>
          </Modal>
        </View>

        <View style={[dashStyles.container, dashStyles.allSetsContainer]}>
          {/* Create new set button */}
            <Pressable style={[styles.createSetButton]} onPress={() => setModalVisible(true)}>
              <Text style={[dashStyles.titleText]}>Create set</Text>
              <Text style={[dashStyles.titleText]}>+</Text>
            </Pressable>

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
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.dark_primary_text,
    borderWidth: 1,
    borderRadius: 6,
  },
  setsContainer: {
    gap: 15,
  },
  setContentsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 150,
  },
  setBtnsContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingRight: 12,
    height: 130,
  },
  modalContainer: {

  },
  modalTitle: {
    fontSize: 25,
    backgroundColor: Colors.light_primary_text,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "black",
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
