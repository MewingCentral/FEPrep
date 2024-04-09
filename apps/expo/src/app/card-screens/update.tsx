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
import { useLocalSearchParams } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadixIcon } from "radix-ui-react-native-icons";
import { Controller, useForm } from "react-hook-form";

import {
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
      console.log("Hi I'm successful!");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  console.log(errors);

  return (
    <KeyboardAwareScrollView style={[styles.screenContainer]}>
      {/* Title input */}
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

      {/* Save updates btn */}
      <View style={[styles.saveBtnContainer]}>
        <Pressable
          style={[styles.saveBtn]}
          onPress={handleSubmit((values) => {
            updatePack.mutate({
              ...values,
              flashcardPackId: packId,
            });
          })}
        >
          <Text style={[styles.saveBtnText]}>Save changes</Text>
        </Pressable>
      </View>

      {/* Cards */}
      <View style={[styles.cardsContainer]}>{flashcards}</View>
    </KeyboardAwareScrollView>
  );
}

function Card({
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
            <Text style={[styles.btnText]}>Edit</Text>
            <RadixIcon name="pencil-2" color={Colors.dark_primary_text} />
          </Pressable>
          <Pressable style={[styles.btn]} onPress={onDelete}>
            <Text style={[styles.btnText]}>Delete</Text>
            <RadixIcon name="trash" color={Colors.dark_primary_text} />
          </Pressable>
        </View>
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
  titleInputContainer: {
    flex: 1,
    alignContent: "stretch",
    marginHorizontal: 20,
    marginTop: 20,
  },
  saveBtnContainer: {
    alignContent: "center",
    alignItems: "center",
    marginTop: 30,
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
  saveBtn: {
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: Colors.dark_accent,
    width: 200,
    height: 50,
  },
  saveBtnText: {
    fontSize: 25,
    textAlign: "center",
    color: Colors.dark_primary_text,
  },
  cardTermLabel: {
    fontSize: 20,
    color: Colors.dark_primary_text,
  },
  cardTermText: {
    fontSize: 16,
    color: Colors.dark_primary_text,
    marginHorizontal: 6,
    marginVertical: 3,
  },
  btn: {
    backgroundColor: "#324461",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: Colors.dark_secondary_text,
    borderRadius: 6,
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
