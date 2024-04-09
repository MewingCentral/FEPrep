import { useLocalSearchParams } from "expo-router";
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RouterOutputs, api } from "~/utils/api";
import Colors from "~/utils/colors";
import { flashcardPacks } from "../../../../../packages/db/src/schema/flashcards";
import { useState } from "react";
import { UpdateFlashcardInput, UpdateFlashcardSchema } from "@feprep/validators";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadixIcon } from "radix-ui-react-native-icons";
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const modalMarginHorizontal = windowWidth / 9;
const modalMarginVertical = windowHeight / 6;

export default function UpdateCards() {
    const { pId, pName } = useLocalSearchParams();
    const defaultTitle = pName && typeof pName === "string" ? pName : "";

    const packId = pId ? +pId : -1;
    const cards = api.flashcards.readCards.useQuery(packId);
    console.log(cards.data);

    const flashcards = 
        cards && cards.data && !cards.isLoading && !cards.isError ? (
            cards.data.map((item) => (
                <Card card={item} key={item.id} />
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

function Card({ card } : {card: RouterOutputs["flashcards"]["readCards"][number]}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [cardExists, setCardExists] = useState(true);

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

    const utils = api.useUtils();

    const updateCard = api.flashcards.updateCard.useMutation({
        onSuccess: async (data) => {
            utils.flashcards.readCards.invalidate();
            setModalVisible(false);
        },
        onError: (error) => {
            console.error(error);
        }
    });

    const onSubmit = (values: UpdateFlashcardInput) => {
        console.log(values);
        updateCard.mutate(values);
    };

    const deleteCard = api.flashcards.deleteCard.useMutation({
        onSuccess: async (data) => {
            utils.flashcards.readCards.invalidate();
            setCardExists(false);
        },
        onError: (error) => {
            console.error(error);
        }
    });

    const onDelete = () => {
        deleteCard.mutate(card.id);
    }

    return (
        <View>
            <View>
                <Modal visible={modalVisible}
                    style={[styles.modalContainer]}
                    animationType="slide"
                    onRequestClose={() => {
                        setModalVisible(false);
                    }}>
                    <Pressable onPress={() => {
                        setModalVisible(false);
                    }}>
                        <RadixIcon name="cross-1" color={Colors.dark_secondary_text} />
                    </Pressable>
                    <View style={{margin:10}}>
                        <Text>New Term</Text>
                        <Controller 
                            control={control}
                            name="front"
                            render={({ field: { onChange, onBlur, value }}) => (
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
                            render={({ field: { onChange, onBlur, value }}) => (
                                <TextInput 
                                    placeholder="Enter definition"
                                    keyboardType="default"
                                    onChangeText={(value) => onChange(value)}
                                    onBlur={onBlur}
                                    value={value}
                                />
                            )}
                        /> 
                        <Pressable style={{borderWidth: 1, borderColor: "black"}}
                            onPress={() => setModalVisible(false)}>
                            <Text>Cancel</Text>
                        </Pressable>   
                        <Pressable style={{borderWidth: 1, borderColor: "black", marginTop: 15, height: 100, width: 100}}
                            onPress={handleSubmit(onSubmit)}>
                            <Text>Save</Text>
                        </Pressable>      
                    </View>
                </Modal>     
            </View>
            {
                (cardExists) && 
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
                        <Pressable style={[styles.btn]} onPress={() => {
                            setModalVisible(true);
                        }}>
                            <Text style={[styles.btnText]}>Edit</Text>
                            <RadixIcon name="pencil-2" color={Colors.dark_primary_text} />
                        </Pressable>
                        <Pressable style={[styles.btn]} onPress={onDelete}>
                            <Text style={[styles.btnText]}>Delete</Text>
                            <RadixIcon name="trash" color={Colors.dark_primary_text} />
                        </Pressable>
                    </View>
                </View> 
            }
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
    }
});