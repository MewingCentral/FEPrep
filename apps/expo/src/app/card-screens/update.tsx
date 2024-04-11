import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Modal from "react-native-modal";
import { router, useLocalSearchParams } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadixIcon } from "radix-ui-react-native-icons";
import { Controller, useForm } from "react-hook-form";

import {
  CreateFlashcardSchema,
  FlashcardInputType,
  UpdateFlashcardInput,
  UpdateFlashcardPackSchema,
  UpdateFlashcardSchema,
} from "@feprep/validators";

import { api, RouterOutputs } from "~/utils/api";
import Colors from "~/utils/colors";
import modalStyles from "~/utils/modal-styles";
import errorStyles from "~/utils/error-styles";

export default function UpdateCards() {
  const { pId, pName, uId, pStatus } = useLocalSearchParams();
  const packName = pName && typeof pName === "string" ? pName : "";
  const userId = uId && typeof uId === "string" ? uId : "";

  const isPublic =
    pStatus && typeof pStatus === "string" && pStatus === "true" ? true : false;
  console.log("isPublic: ", isPublic);

  const packId = pId ? +pId : -1;
  const cards = api.flashcards.readCards.useQuery(packId);
  console.log(cards.data);

  const flashcards =
    cards && cards.data && !cards.isLoading && !cards.isError ? (
      cards.data.map((item) => <Card card={item} key={item.id} />)
    ) : (
      <View>
        <Text style={[errorStyles.darkModeErrorText]}>Encountered an error loading cards...</Text>
      </View>
    );

  // Update pack api stuff
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(UpdateFlashcardPackSchema),
    defaultValues: {
      name: packName,
      userId: userId,
      isPublic, // todo change
      flashcardPackId: packId,
    },
  });

  const util = api.useUtils();
  const updatePack = api.flashcards.updatePack.useMutation({
    onSuccess: async () => {
      await util.flashcards.readPack.invalidate();
      router.back();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  console.log(errors);

  return (
    <KeyboardAwareScrollView
      style={[styles.screenContainer]}
      keyboardShouldPersistTaps="handled"
    >
      {/* Save updates btn */}
      <View style={[styles.mainBtnContainer]}>
        <Pressable
          style={[styles.mainBtn]}
          onPress={handleSubmit((values) => {
            updatePack.mutate({
              ...values,
              flashcardPackId: packId,
            });
          })}
        >
          <Text style={[styles.mainBtnText]}>Save changes</Text>
        </Pressable>
      </View>

      {/* Title input */}
      <View style={[styles.titleContainer]}>
        <View style={{ flexDirection: "row" }}>
          <View style={[styles.titleInputContainer]}>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input]}
                  multiline={true}
                  defaultValue={packName}
                  placeholder="Enter title"
                  cursorColor={Colors.dark_primary_text}
                  keyboardType="default"
                  onChangeText={(value) => onChange(value)}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
          </View>
        </View>
        <Text style={[styles.titleLabel]}>Title</Text>
      </View>

      <Controller
        control={control}
        name="isPublic"
        render={({ field: { onChange, value } }) => (
          <View style={[styles.publicityContainer]}>
            <View style={[styles.publicityItemsContainer]}>
              <View style={[styles.publicityTextContainer]}>
                {value ? (
                  <Text
                    style={[styles.publicityText, styles.publicityTextPublic]}
                  >
                    Public{" "}
                  </Text>
                ) : (
                  <Text style={[styles.publicityText]}>Private</Text>
                )}
              </View>
              <View style={[styles.publicitySwitchContainer]}>
                <Switch
                  trackColor={{ false: Colors.dark_bg, true: Colors.light_bg }}
                  thumbColor={
                    value
                      ? Colors.dark_secondary_text
                      : Colors.dark_secondary_text
                  }
                  onValueChange={onChange}
                  value={value}
                />
              </View>
            </View>
          </View>
        )}
      />

      <View style={{paddingBottom: 100,}}>
        {/* Cards */}
        <View style={[styles.cardsContainer]}>{flashcards}</View>

        {/* Add Card */}
        <AddCard packId={packId} />
      </View>
    </KeyboardAwareScrollView>
  );
}

export function Card({
  card,
}: {
  card: RouterOutputs["flashcards"]["readCards"][number];
}) {
  const [modalVisible, setModalVisible] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(UpdateFlashcardSchema),
    defaultValues: {
      packId: card.packId,
      front: card.front,
      back: card.back,
      flashcardId: card.id,
    },
  });
  console.log(errors);

  const utils = api.useUtils();

  const updateCard = api.flashcards.updateCard.useMutation({
    onSuccess: async () => {
      await utils.flashcards.readCards.invalidate();
      setModalVisible(false);
      reset();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = (values: UpdateFlashcardInput) => {
    console.log(values);
    updateCard.mutate(values);
  };

  const deleteCard = api.flashcards.deleteCard.useMutation({
    onSuccess: async () => {
      await utils.flashcards.readCards.invalidate();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onDelete = () => {
    deleteCard.mutate(card.id);
  };

  return (
    <View>
      <View>
        {/* Update Card Modal */}
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
              <Text style={[modalStyles.headerText]}>Edit Card</Text>
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
              <Text style={[modalStyles.inputLabel]}>Term</Text>
              <Controller
                control={control}
                name="front"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[modalStyles.inputField]}
                    multiline={true}
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
              {errors.front?.message && (
                <Text style={[modalStyles.inputErrorMsg]}>
                  {errors.front?.message}
                </Text>
              )}
            </View>
            <View style={[modalStyles.inputContainer]}>
              <Text style={[modalStyles.inputLabel]}>Definition</Text>
              <Controller
                control={control}
                name="back"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[modalStyles.inputField]}
                    multiline={true}
                    placeholder="Enter definition"
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
              {errors.front?.message && (
                <Text style={[modalStyles.inputErrorMsg]}>
                  {errors.front?.message}
                </Text>
              )}
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
                onPress={handleSubmit(onSubmit)}
              >
                <Text style={[modalStyles.footerBtnText]}>Save</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
      <View style={[styles.cardContainer]}>
        <View style={[styles.cardTextContainer]}>
          <Text style={[styles.cardTermLabel]}>Term</Text>
          <View style={[styles.cardTermTextContainer]}>
            <Text style={[styles.cardTermText]}>{card.front}</Text>
          </View>
          <Text style={[styles.cardTermLabel]}>Definition</Text>
          <View style={[styles.cardTermTextContainer]}>
            <Text style={[styles.cardTermText]}>{card.back}</Text>
          </View>
        </View>
        <View style={[styles.btnsContainer]}>
          <Pressable
            style={[styles.btn]}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <View style={[styles.btnContents]}>
              <Text style={[styles.btnText]}>Edit</Text>
              <RadixIcon name="pencil-2" color={Colors.dark_primary_text} />
            </View>
          </Pressable>
          <Pressable style={[styles.btn]} onPress={onDelete}>
            <View style={[styles.btnContents]}>
              <Text style={[styles.btnText]}>Delete</Text>
              <RadixIcon name="trash" color={Colors.dark_primary_text} />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function AddCard({ packId }: { packId: number }) {
  const [modalVisible, setModalVisible] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CreateFlashcardSchema),
    defaultValues: {
      packId: packId,
      front: "",
      back: "",
    },
  });

  const utils = api.useUtils();

  const createCard = api.flashcards.createCard.useMutation({
    onSuccess: async (data) => {
      await utils.flashcards.readCards.invalidate();
      if (!(data instanceof Error)) {
        console.log("created card data: ", data);
      }
      setModalVisible(false);
      reset();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = (values: FlashcardInputType) => {
    console.log("values sending to create endpoint: ", values);
    createCard.mutate(values);
  };

  console.log(errors);

  return (
    <View>
      {/* Create Card Modal */}
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
              <Text style={[modalStyles.headerText]}>New Card</Text>
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
              <Text style={[modalStyles.inputLabel]}>Term</Text>
              <Controller
                control={control}
                name="front"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[modalStyles.inputField]}
                    multiline={true}
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
              {errors.front?.message && (
                <Text style={[modalStyles.inputErrorMsg]}>
                  {errors.front?.message}
                </Text>
              )}
            </View>
            <View style={[modalStyles.inputContainer]}>
              <Text style={[modalStyles.inputLabel]}>Definition</Text>
              <Controller
                control={control}
                name="back"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[modalStyles.inputField]}
                    multiline={true}
                    placeholder="Enter definition"
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
              {errors.front?.message && (
                <Text style={[modalStyles.inputErrorMsg]}>
                  {errors.front?.message}
                </Text>
              )}
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
                onPress={handleSubmit(onSubmit)}
              >
                <Text style={[modalStyles.footerBtnText]}>Save</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
      <View style={[styles.mainBtnContainer]}>
        <Pressable
          style={[styles.mainBtn]}
          onPress={() => setModalVisible(true)}
        >
          <View style={[styles.mainBtnContentContainer]}>
            <RadixIcon name="plus" size={30} color={Colors.dark_primary_text} />
            <Text style={[styles.mainBtnText]}>New card</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flexGrow: 1,
    flexDirection: "column",
    gap: 30,
    paddingTop: 20,
    alignContent: "center",
  },
  titleContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    gap: 10,
  },
  titleInputContainer: {
    flex: 1,
    alignContent: "stretch",
  },
  titleLabel: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.dark_primary_text,
  },
  mainBtnContainer: {
    alignContent: "center",
    alignItems: "center",
    gap: 20,
  },
  mainBtnContentContainer: {
    flexDirection: "row",
    gap: 15,
  },
  cardsContainer: {
    alignSelf: "center",
    gap: 30,
    marginVertical: 30,
  },
  cardContainer: {
    alignContent: "stretch",
    justifyContent: "space-between",
    minHeight: 180,
    width: 300,
    gap: 25,
    backgroundColor: Colors.dark_sec,
    borderColor: "rgba(148, 163, 184, 0.50)",
    borderWidth: 2,
    borderRadius: 6,
  },
  cardTextContainer: {
    marginTop: 10,
    marginHorizontal: 10,
    gap: 5,
  },
  cardTermTextContainer: {
    marginBottom: 5,
  },
  btnsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 300,
    marginBottom: 10,
  },
  modalContainer: {
    backgroundColor: "#00000080",
    height: 100,
  },
  input: {
    fontSize: 20,
    color: Colors.dark_primary_text,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark_primary_text,
  },
  mainBtn: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light_secondary_text,
    width: 200,
    height: 50,
    borderRadius: 6,
  },
  mainBtnText: {
    fontSize: 25,
    textAlign: "center",
    color: Colors.dark_primary_text,
  },
  cardTermLabel: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 10,
    color: Colors.dark_primary_text,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark_secondary_text,
  },
  cardTermText: {
    fontSize: 16,
    color: Colors.dark_secondary_text,
    marginHorizontal: 10,
    marginTop: 3,
    marginBottom: 15,
  },
  btn: {
    backgroundColor: Colors.light_primary_text,
    flexDirection: "column",
    justifyContent: "center",
    height: 50,
    width: 100,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: Colors.light_primary_text,
    borderRadius: 6,
  },
  btnContents: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  btnText: {
    fontSize: 20,
    color: Colors.dark_primary_text,
  },
  delYellowBorder: {
    borderWidth: 1,
    borderColor: "yellow",
  },

  // Public vs private components
  publicityContainer: {
    flexDirection: "row",
    paddingLeft: 10,
    justifyContent: "center",
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
});
