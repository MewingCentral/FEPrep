import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { api } from "~/utils/api";
import Colors from "~/utils/colors";
import { flashcardPacks } from "../../../../../packages/db/src/schema/flashcards";
import { useState } from "react";
import { UpdateFlashcardInput, UpdateFlashcardSchema } from "@feprep/validators";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function Card({ term, def } : {term:string|null, def:string|null}) {
    return (
        <View style={[styles.cardContainer]}>
        <View style={[styles.cardInputContainer]}>
            {
                term === null ?
                <TextInput 
                    style={[styles.input]}
                    placeholder="Enter term"
                    placeholderTextColor={Colors.dark_primary_text}
                    cursorColor={Colors.dark_primary_text}
                /> :
                <TextInput 
                    style={[styles.input]}
                    defaultValue={term}
                    placeholder="Enter term"
                    placeholderTextColor={Colors.dark_primary_text}
                    cursorColor={Colors.dark_primary_text}
                />
            }
        </View>

        <View style={[styles.cardInputContainer]}>
            {
                def === null ?
                <TextInput 
                    style={[styles.input]}
                    placeholder="Enter definition"
                    placeholderTextColor={Colors.dark_primary_text}
                    cursorColor={Colors.dark_primary_text}
                /> :
                <TextInput 
                    style={[styles.input]}
                    defaultValue={def}
                    placeholder="Enter definition"
                    placeholderTextColor={Colors.dark_primary_text}
                    cursorColor={Colors.dark_primary_text}
                />
            }
        </View>
        </View>
    );
}

export default function UpdateCards() {
    const { pId, pName } = useLocalSearchParams();
    const defaultTitle = pName && typeof pName === "string" ? pName : "";

    const packId = pId ? +pId : -1;
    const cards = api.flashcards.readCards.useQuery(packId);
    console.log(cards.data);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(UpdateFlashcardSchema),
        defaultValues: {
            packId: 0,
            front: "",
            back: "",
            flashcardId: 0,
        },
    });

    const updateCard = api.flashcards.updateCard.useMutation({
        onSuccess: (data) => {
            console.log("card updated in db");
        },
        onError: (error) => {
            console.error(error);
        }
    });

    const onSubmit = (values: UpdateFlashcardInput[]) => {
        values.forEach((cardInput) => {
            updateCard.mutate(cardInput);
        })
    };

    const [cardSubmitHandlers, setCardSubmitHandlers] = useState([]);

    const flashcards = 
        cards && cards.data && !cards.isLoading && !cards.isError ? (
            cards.data.map((item) => (
                // <Card term={item.front} def={item.back} key={item.id} />
                <View style={[styles.cardContainer]}>
                <View style={[styles.cardInputContainer]}>
                    {
                        item.front === null ?
                        <TextInput 
                            style={[styles.input]}
                            placeholder="Enter term"
                            placeholderTextColor={Colors.dark_primary_text}
                            cursorColor={Colors.dark_primary_text}
                        /> :
                        <TextInput 
                            style={[styles.input]}
                            defaultValue={item.front}
                            placeholder="Enter term"
                            placeholderTextColor={Colors.dark_primary_text}
                            cursorColor={Colors.dark_primary_text}
                        />
                    }
                </View>
        
                <View style={[styles.cardInputContainer]}>
                    {
                        item.back === null ?
                        <TextInput 
                            style={[styles.input]}
                            placeholder="Enter definition"
                            placeholderTextColor={Colors.dark_primary_text}
                            cursorColor={Colors.dark_primary_text}
                        /> :
                        <TextInput 
                            style={[styles.input]}
                            defaultValue={item.back}
                            placeholder="Enter definition"
                            placeholderTextColor={Colors.dark_primary_text}
                            cursorColor={Colors.dark_primary_text}
                        />
                    }
                </View>
                </View>
            ))
        ) : (
            <View>
                <Text>Error msg</Text>
            </View>
        );

    return (
        <KeyboardAwareScrollView style={[styles.screenContainer]}>
            {/* Title input */}
            <View style={{ flexDirection: "row" }}>
                <View style={[styles.titleInputContainer]}>
                    <TextInput
                        style={[styles.input]}
                        defaultValue={defaultTitle}
                        placeholder="Enter title"
                        cursorColor={Colors.dark_primary_text}
                     />
                </View>
            </View>

            {/* Cards */}
            <View style={[styles.cardsContainer]}>
                {flashcards}
            </View>

            {/* Save Set */}

        </KeyboardAwareScrollView>
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
        fontSize: 20,
        color: Colors.dark_primary_text,
        borderBottomWidth: 1,
        borderBottomColor: Colors.dark_primary_text,
    },
    delYellowBorder: {
        borderWidth: 1,
        borderColor: "yellow",
    }
});