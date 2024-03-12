import { StyleSheet, View, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Colors from "~/utils/colors";

export default function cardCreation() {
    return (
        <SafeAreaView style={[styles.screenContainer]}>
            {/* Title input */}
            <View style={{ flexDirection: "row" }}>
                <View style={[styles.container, styles.inputContainer]}>
                    <TextInput 
                        style={[styles.input]} 
                        placeholder="Enter set title" 
                        placeholderTextColor={Colors.dark_secondary_text}
                        cursorColor={Colors.dark_primary_text}/>
                </View>
            </View>

            {/* Card forms */}
            <View style={[styles.deleteYellowBorder, styles.container, styles.cardsContainer]}>

                {/* Individual card form */}
                <View style={[styles.container, styles.cardContainer]}>
                    <View style={[styles.cardInputContainer]}>
                        <TextInput 
                            style={[styles.input]}
                            placeholder="Enter term"
                            placeholderTextColor={Colors.dark_secondary_text}
                            cursorColor={Colors.dark_primary_text}/>
                        <Text style={[styles.cardInputLabel]}>Term</Text>
                    </View>

                    <View style={[styles.cardInputContainer]}>
                        <TextInput 
                            style={[styles.input]}
                            placeholder="Enter definition"
                            placeholderTextColor={Colors.dark_secondary_text}
                            cursorColor={Colors.dark_primary_text}/>
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
                            cursorColor={Colors.dark_primary_text}/>
                        <Text style={[styles.cardInputLabel]}>Term</Text>
                    </View>

                    <View style={[styles.cardInputContainer]}>
                        <TextInput 
                            style={[styles.input]}
                            placeholder="Enter definition"
                            placeholderTextColor={Colors.dark_secondary_text}
                            cursorColor={Colors.dark_primary_text}/>
                        <Text style={[styles.cardInputLabel]}>Definition</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
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
    cardsContainer: {
        gap: 30,
    },
    cardContainer: {
        alignContent: "stretch",
        justifyContent: "space-between",
        height: 200,
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
    cardInputLabel: {
        color: Colors.dark_primary_text,
        fontSize: 16,
    },
    deleteYellowBorder: {
        borderWidth: 1,
        borderColor: "yellow",
    },
});
