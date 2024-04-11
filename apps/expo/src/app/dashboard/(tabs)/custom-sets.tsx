import { useState } from "react";
import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadixIcon } from "radix-ui-react-native-icons";
import { Controller, useForm } from "react-hook-form";

import { CreateFlashcardPackSchema } from "@feprep/validators";

import { api, RouterOutputs } from "~/utils/api";
import Colors from "~/utils/colors";
import dashStyles from "~/utils/dash-styles";
import modalStyles from "~/utils/modal-styles";
import errorStyles from "~/utils/error-styles";

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
    setModalVisible(false);
  };

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <View>
        <Modal
          isVisible={modalVisible}
          hasBackdrop={true}
          backdropColor="black"
          backdropOpacity={0.7}
          onBackdropPress={() => {
            setModalVisible(false);
          }}
        >
          <View style={[modalStyles.container]}>
            <View
              style={[modalStyles.headerContainer, styles.deleteModalHeader]}
            >
              <Pressable
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <RadixIcon
                  name="cross-circled"
                  size={25}
                  color={Colors.dark_secondary_text}
                />
              </Pressable>
            </View>
            <View style={[modalStyles.inputContainer]}>
              <Text style={[modalStyles.inputLabel]}>
                Are you sure you want to delete {pack.name}?
              </Text>
            </View>
            <View style={[modalStyles.footerBtnsContainer]}>
              <Pressable
                style={[modalStyles.footerBtn]}
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Text style={[modalStyles.footerBtnText]}>Cancel</Text>
              </Pressable>
              <Pressable style={[modalStyles.footerBtn]} onPress={onDelete}>
                <Text style={[modalStyles.footerBtnText]}>Confirm</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
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
            {pack.isPublic ? (
              <Text style={[styles.setStatusText, dashStyles.setText]}>
                Public
              </Text>
            ) : (
              <Text style={[styles.setStatusText, dashStyles.setText]}>
                Private
              </Text>
            )}
          </View>
          <View style={[styles.setBtnsContainer]}>
            <Pressable
              onPress={async () => {
                router.push({
                  pathname: "../../card-screens/update",
                  params: {
                    pId: pack.id,
                    pName: pack.name,
                    uId: pack.userId,
                    pStatus: pack.isPublic ? "true" : "false",
                  },
                });
                await utils.flashcards.readPack.invalidate();
              }}
            >
              <RadixIcon
                name="pencil-2"
                color={Colors.dark_secondary_text}
                size={30}
              />
            </Pressable>
            <Pressable
              onPress={() => {
                setModalVisible(true);
              }}
            >
              <RadixIcon
                name="trash"
                color={Colors.dark_secondary_text}
                size={33}
              />
            </Pressable>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

function Packs() {
  const userId = SecureStore.getItem("userId")!;
  const packs = api.flashcards.readPack.useQuery(userId);

  // Refetch packs on focus
  useFocusEffect(() => {
    void packs.refetch();
  });

  // TODO error text
  if (packs.isLoading) {
    return <Text style={[errorStyles.darkModeErrorText]}>Loading...</Text>;
  }

  if (packs.isError) {
    return <Text style={[errorStyles.darkModeErrorText]}>Oops... There was an issue loading your packs</Text>;
  }

  if (!packs.data?.length) {
    return <Text style={[errorStyles.darkModeErrorText]}>You have no packs</Text>;
  }

  return (
    <View style={{paddingBottom: 50}}>
      <SearchPacks packs={packs.data} />
    </View>
  );
}

function SearchPacks({
  packs,
}: {
  packs: RouterOutputs["flashcards"]["readPack"];
}) {
  const [searchInput, setSearchInput] = useState("");
  console.log("search input: ", searchInput);

  const filteredPacks = packs.filter((pack) => {
    return pack.name.toLowerCase().includes(searchInput.toLowerCase());
  });

  console.log("filtered packs: ", filteredPacks);

  return (
    <View>
      <KeyboardAvoidingView
        style={[{ flexDirection: "row", alignItems: "stretch" }]}
      >
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
  const [modalVisible, setModalVisible] = useState(false);
  const userId = SecureStore.getItem("userId")!;
  const router = useRouter();

  const [packIsPublic, setPackIsPublic] = useState(true);
  const togglePublicity = () => {
    setPackIsPublic((previousState) => !previousState);
  };

  console.log("public? ", packIsPublic);

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
      isPublic: packIsPublic,
    },
  });
  console.log(errors);

  const utils = api.useUtils();

  const createPack = api.flashcards.createPack.useMutation({
    onSuccess: async (data) => {
      await utils.flashcards.readPack.invalidate();
      if (!(data instanceof Error)) {
        console.log("my id is ", data[0]!.id);
        const isPublicString = data[0]!.isPublic ? "true" : "false";
        router.push({
          pathname: "../../card-screens/update",
          params: {
            pId: data[0]!.id,
            pName: data[0]!.name,
            uId: data[0]!.userId,
            pStatus: isPublicString,
          },
        });
      }
      setModalVisible(false);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <SafeAreaView style={[dashStyles.container, dashStyles.screenContainer]}>
      <KeyboardAwareScrollView
        style={[dashStyles.outer]}
        keyboardShouldPersistTaps="handled"
      >
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
                <Pressable
                  onPress={() => {
                    setModalVisible(false);
                    reset();
                  }}
                >
                  <RadixIcon
                    name="cross-circled"
                    size={25}
                    color={Colors.dark_secondary_text}
                  />
                </Pressable>
              </View>
              <View style={[modalStyles.inputContainer]}>
                <Text style={[modalStyles.inputLabel]}>Title</Text>
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[modalStyles.inputField]}
                      multiline={true}
                      placeholder="Enter title"
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
                {errors.name?.message && (
                  <Text style={[modalStyles.inputErrorMsg]}>
                    {errors.name?.message}
                  </Text>
                )}
              </View>

              {/* TODO test this */}
              <View style={[styles.publicityContainer]}>
                <View style={[styles.publicityItemsContainer]}>
                  <View style={[styles.publicityTextContainer]}>
                    {packIsPublic ? (
                      <Text
                        style={[
                          styles.publicityText,
                          styles.publicityTextPublic,
                        ]}
                      >
                        Public{" "}
                      </Text>
                    ) : (
                      <Text style={[styles.publicityText]}>Private</Text>
                    )}
                  </View>
                  <View style={[styles.publicitySwitchContainer]}>
                    <Switch
                      trackColor={{
                        false: Colors.dark_bg,
                        true: Colors.light_bg,
                      }}
                      thumbColor={
                        packIsPublic
                          ? Colors.dark_secondary_text
                          : Colors.dark_secondary_text
                      }
                      onValueChange={togglePublicity}
                      value={packIsPublic}
                    />
                  </View>
                </View>
              </View>

              <View style={[modalStyles.footerBtnsContainer]}>
                <Pressable
                  style={[modalStyles.footerBtn]}
                  onPress={() => {
                    setModalVisible(false);
                    reset();
                  }}
                >
                  <Text style={[modalStyles.footerBtnText]}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={[modalStyles.footerBtn]}
                  onPress={handleSubmit((values) => {
                    console.log(values);
                    createPack.mutate(values);
                  })}
                >
                  <Text style={[modalStyles.footerBtnText]}>Create</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>

        <View style={[dashStyles.container, dashStyles.allSetsContainer]}>
          {/* Create new set button */}
          <Pressable
            style={[styles.createSetButton]}
            onPress={() => setModalVisible(true)}
          >
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
    marginTop: 20,
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
    height: 130,
  },
  setTextContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  setBtnsContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingRight: 12,
    height: 130,
  },
  errorTxt: {
    fontSize: 20,
    marginTop: 30,
    textAlign: "center",
    color: Colors.dark_primary_text,
  },
  setStatusText: {
    fontSize: 15,
    color: Colors.dark_secondary_text,
  },
  deleteYellowBorder: {
    borderWidth: 1,
    borderColor: "yellow",
  },

  // Public vs private components
  publicityContainer: {
    flexDirection: "row",
    paddingLeft: 10,
  },
  publicityItemsContainer: {
    flexDirection: "row",
    paddingLeft: 10,
    gap: 10,
    backgroundColor: Colors.dark_sec2,
    borderColor: Colors.dark_secondary_text,
    borderWidth: 1,
    borderRadius: 50,
  },
  publicityTextContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  publicitySwitchContainer: {
    paddingLeft: 3,
    paddingRight: 6,
  },
  publicityText: {
    fontSize: 18,
    color: Colors.dark_primary_text,
  },
  publicityTextPublic: {
    paddingRight: 1,
  },

  // Delete modal styling
  deleteModalHeader: {
    alignItems: "flex-end",
  },
});
