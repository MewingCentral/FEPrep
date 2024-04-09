import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RadixIcon } from "radix-ui-react-native-icons";

import Colors from "~/utils/colors";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateFlashcardPackInput, CreateFlashcardPackSchema, UpdateFlashcardPackSchema } from "@feprep/validators";
import * as SecureStore from "expo-secure-store";
import { api } from "~/utils/api";
import { router } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Card } from "./update";
import { useState } from "react";

export default function cardCreation() {

  // Create api stuff
  const userId = SecureStore.getItem("userId")!;
  const {
    control,
    handleSubmit,
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
      console.log("my id is ", data.id);
      // setPackId(data.id);
      // router.back();
    },
    onError: (error) => {
      console.error(error);
    }
  });

  const onSubmit = (values: CreateFlashcardPackInput) => {
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log(values);
    createPack.mutate(values);
  }
  
  return (
    <SafeAreaView style={[styles.screenContainer]}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'}>
        {/* Title input */}
        <View style={{ flexDirection: "row" }}>
          <View style={[styles.container, styles.inputContainer, styles.deleteYellowBorder]}>
            <Controller 
                control={control}
                name="name"
                render={({ field: {onChange, onBlur, value }}) => (
                  <TextInput 
                    style={[styles.input]}
                    placeholder="Enter title"
                    keyboardType="default"
                    onChangeText={(value) => onChange(value)}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
              />
          </View>
        </View>

        {/* Save changes */}
        <View style={[styles.saveBtnContainer]}>
          <Pressable style={[styles.saveBtn]} onPress={handleSubmit(onSubmit)}>
            <Text style={[styles.saveBtnText]}>Save changes</Text>
          </Pressable>
        </View>

        {/* Card forms */}
        <View style={[styles.container, styles.cardsContainer]}>
          {/* Individual card form */}
          <View style={[styles.container, styles.cardContainer]}>
            <View style={[styles.cardInputContainer]}>
              <TextInput
                style={[styles.input]}
                placeholder="Enter term"
                placeholderTextColor={Colors.dark_secondary_text}
                cursorColor={Colors.dark_primary_text}
              />
              <Text style={[styles.cardInputLabel]}>Term</Text>
            </View>

            <View style={[styles.cardInputContainer]}>
              <TextInput
                style={[styles.input]}
                placeholder="Enter definition"
                placeholderTextColor={Colors.dark_secondary_text}
                cursorColor={Colors.dark_primary_text}
              />
              <Text style={[styles.cardInputLabel]}>Definition</Text>
            </View>
          </View>

          {/* Individual card form */}
          <View style={[styles.container, styles.cardContainer]}>
            <View style={[styles.cardInputContainer]}>
              <TextInput
                style={[styles.input]}
                placeholder="Enter term"
                placeholderTextColor={Colors.dark_secondary_text}
                cursorColor={Colors.dark_primary_text}
              />
              <Text style={[styles.cardInputLabel]}>Term</Text>
            </View>

            <View style={[styles.cardInputContainer]}>
              <TextInput
                style={[styles.input]}
                placeholder="Enter definition"
                placeholderTextColor={Colors.dark_secondary_text}
                cursorColor={Colors.dark_primary_text}
              />
              <Text style={[styles.cardInputLabel]}>Definition</Text>
            </View>
          </View>
        </View>

        {/* Add more button */}
        <Pressable>
          <RadixIcon
            name="plus-circled"
            size={60}
            color={Colors.dark_primary_text}
          />
        </Pressable>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

function CreatedCards() {
  const cards = api.flashcards.readCards.useQuery();

  return (
    <Card />
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flexWrap: "wrap",
  },
  screenContainer: {
    flexGrow: 1,
    gap: 30,
    alignContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flex: 1,
    alignContent: "stretch",
    marginHorizontal: 20,
  },
  saveBtnContainer: {
    alignContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  cardsContainer: {
    gap: 30,
  },
  cardContainer: {
    alignContent: "stretch",
    justifyContent: "space-between",
    minHeight: 180,
    width: 300,
    backgroundColor: Colors.dark_sec,
    borderColor: "rgba(148, 163, 184, 0.50)",
    borderWidth: 2,
    borderRadius: 6,
  },
  cardInputContainer: {
    padding: 15,
    gap: 10,
  },
  input: {
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
  cardInputLabel: {
    color: Colors.dark_primary_text,
    fontSize: 16,
  },
  deleteYellowBorder: {
    borderWidth: 1,
    borderColor: "yellow",
  },
});
