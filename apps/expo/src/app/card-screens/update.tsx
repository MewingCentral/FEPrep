import { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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

export default function UpdateCards() {
  const { pId, pName, uId } = useLocalSearchParams();
  const packName = pName && typeof pName === "string" ? pName : "";
  const userId = uId && typeof uId === "string" ? uId : "";

  const packId = pId ? +pId : -1;
  const cards = api.flashcards.readCards.useQuery(packId);
  console.log(cards.data);

  const flashcards =
    cards && cards.data && !cards.isLoading && !cards.isError ? (
      cards.data.map((item) => <Card card={item} key={item.id} />)
    ) : (
      <View>
        <Text>Error msg</Text>
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
    <KeyboardAwareScrollView style={[styles.screenContainer]}>
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

      {/* Cards */}
      <View style={[styles.cardsContainer]}>{flashcards}</View>

      {/* Add Card */}
      <AddCard packId={packId} />
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
        <Modal
          visible={modalVisible}
          style={[styles.modalContainer]}
          animationType="slide"
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <Pressable
            onPress={() => {
              setModalVisible(false);
            }}
          >
            <RadixIcon name="cross-1" color={Colors.dark_secondary_text} />
          </Pressable>
          <View style={{ margin: 10 }}>
            <Text>New Term</Text>
            <Controller
              control={control}
              name="front"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Enter term"
                  keyboardType="default"
                  onChangeText={(value) => onChange(value)}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            <Text>New Definition</Text>
            <Controller
              control={control}
              name="back"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Enter definition"
                  keyboardType="default"
                  onChangeText={(value) => onChange(value)}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            <Pressable
              style={{ borderWidth: 1, borderColor: "black" }}
              onPress={() => setModalVisible(false)}
            >
              <Text>Cancel</Text>
            </Pressable>
            <Pressable
              style={{
                borderWidth: 1,
                borderColor: "black",
                marginTop: 15,
                height: 100,
                width: 100,
              }}
              onPress={handleSubmit(onSubmit)}
            >
              <Text>Save</Text>
            </Pressable>
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

function AddCard({packId}:{packId:number}) {
  const [modalVisible, setModalVisible] = useState(false);

  const {
    control,
    handleSubmit,
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

  const createCard= api.flashcards.createCard.useMutation({
    onSuccess: async (data) => {
      await utils.flashcards.readCards.invalidate();
      if (!(data instanceof Error)) {
        console.log("created card data: ", data);
      }
      setModalVisible(false);
    },
    onError: (error) => {
      console.error(error);
    }
  });

  const onSubmit = (values: FlashcardInputType) => {
    console.log("values sending to create endpoint: ", values);
    createCard.mutate(values);
  }

  console.log(errors);

  return (
    <View>

      {/* Create Card Modal */}
      <View>
        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <Pressable onPress={() => setModalVisible(false)}>
            <RadixIcon name="cross-1" color={Colors.light_secondary_text} />
          </Pressable>
          <Text>Term</Text>
          <Controller 
            control={control}
            name="front"
            render={({field:{onChange,onBlur,value}}) => (
              <TextInput
                placeholder="Enter term"
                keyboardType="default"
                onChangeText={(value) => onChange(value)}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          {errors.front?.message && <Text>{errors.front?.message}</Text>}
          <Text>Definition</Text>
          <Controller 
            control={control}
            name="back"
            render={({field:{onChange,onBlur,value}}) => (
              <TextInput
                placeholder="Enter term"
                keyboardType="default"
                onChangeText={(value) => onChange(value)}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          {errors.back?.message && <Text>{errors.back?.message}</Text>}

          <View style={[styles.mainBtnContainer]}>
            <Pressable style={[styles.mainBtn]} onPress={() => setModalVisible(false)}>
              <Text style={[styles.mainBtnText]}>Cancel</Text>
            </Pressable>
            <Pressable style={[styles.mainBtn]} onPress={handleSubmit(onSubmit)}>
              <Text style={[styles.mainBtnText]}>Save</Text>
            </Pressable>
          </View>
        </Modal>
      </View>
      <View style={[styles.mainBtnContainer]}>
        <Pressable style={[styles.mainBtn]} onPress={() => setModalVisible(true)}>
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
    // marginTop: 30,
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
    // borderWidth: 2,
    // borderColor: Colors.dark_btn_border,
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
    // marginVertical: 3,
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
});
