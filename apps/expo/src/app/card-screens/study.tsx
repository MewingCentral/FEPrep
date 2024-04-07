import { RadixIcon } from "radix-ui-react-native-icons";
import { Text, View, StyleSheet, Pressable } from "react-native";
import Colors from "~/utils/colors";
import * as Progress from 'react-native-progress';

import { useLocalSearchParams } from "expo-router";
import { api } from "~/utils/api";
import { useState } from "react";

function CardWithNav({ cards }) {
    const [curCard, setCurCard] = useState(0);
    
    return (
        <View style={[styles.screenContainer]}>
            <Pressable style={[styles.cardContainer]} 
            onPress={() => alert("heehee")}>
                <Text style={[styles.defText]}>
                    {cards[curCard].back}
                </Text>
            </Pressable>

            {/* Card Navigation */}
            <View style={[styles.cardNavContainer]}>
                <Pressable>
                    <RadixIcon name="arrow-left" size={40} color={Colors.dark_secondary_text} />
                </Pressable>
                <Pressable style={[styles.shuffleContainer]}>
                    <RadixIcon name="shuffle" color={Colors.dark_secondary_text} />
                </Pressable>
                <Pressable onPress={() => {
                    setCurCard(curCard + 1);
                }}>
                    <RadixIcon name="arrow-right" size={40} color={Colors.dark_secondary_text} />
                </Pressable>
            </View>

            {/* Progress Bar */}
            <View style={[styles.progressContainer]}>
                <Text style={[styles.progressText]}>3/10</Text>
                <Progress.Bar style={[styles.progressBar]} 
                progress={0.3} 
                height={10}
                width={300} 
                unfilledColor={Colors.dark_secondary_text} 
                color={Colors.dark_primary_text} 
                borderWidth={0} />               
            </View>

        </View>
    );
}

export default function StudySet() {
    const { id } = useLocalSearchParams();
    console.log("packId in study pg: ", id);
    const packId = id ? +id : -1;

    const cards = (packId !== -1) ?
     api.flashcards.readCards.useQuery(packId) :
     undefined;

    if (cards && !cards.isLoading && !cards.isError) {
        console.log(cards.data);
    }

    // preparing to display
    // todo handle case where cards has no uhhhh members
    
    return (
        <View style={[styles.screenContainer]}>
            {
                (cards && !cards.isLoading && !cards.isError) ? 
                <CardWithNav 
                    cards={cards.data}
                /> :
                <Text style={{color: Colors.dark_primary_text}}>Errormsggg</Text>
            }

        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    cardContainer: {
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: Colors.dark_sec,
        borderRadius: 10,
        height: 300,
        width: 300,
    },
    cardNavContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        width: 300,
    },
    shuffleContainer: {
        flexDirection: "column",
        justifyContent: "center",
    },
    progressContainer: {
        position: "absolute",
        bottom: 0,
        marginBottom: 20,
        justifyContent: "space-between",
        height: 45,
    },
    defText: {
        marginHorizontal: 25,
        textAlign: "center",
        fontSize: 18,
        color: Colors.dark_primary_text,
    },
    progressText: {
        textAlign: "center",
        fontSize: 22,
        color: Colors.dark_secondary_text,
    },
    progressBar: {
        flexDirection: "column",
        alignContent: "flex-end",
    },
    delYellowBorder: {
        borderWidth: 1,
        borderColor: "yellow",
    }
});