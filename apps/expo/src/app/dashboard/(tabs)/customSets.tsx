import { StyleSheet, View, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Stack } from "expo-router";

import Colors from "../../../utils/colors";

export default function Tab() {
    return(
        <SafeAreaView style={[styles.deleteYellowBorder, styles.container, styles.screenContainer]}>

            {/* Search input */}
            <View style={{ flexDirection: "row" }}>
                <View style={[styles.deleteYellowBorder, styles.container, styles.inputContainer]}>
                    <TextInput style={[styles.input]} placeholder={"Enter set"} placeholderTextColor={Colors.dark_secondary_text} cursorColor={Colors.dark_primary_text}/>
                </View>
            </View>

            {/* Study sets */}
            <View style={[styles.container]}>
                {/* Individual study set */}
                <View style={[styles.container, styles.setContainer]}>
                    <Text style={[styles.setTitle]}>Set 1</Text>
                    <Text style={[]}>15 terms</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flexWrap: "wrap",
        backgroundColor: Colors.dark_bg,
    },
    screenContainer: {
        flexGrow: 1,
        gap: 30,
        alignContent: "center",
        alignItems: "center",
        backgroundColor: Colors.dark_bg,
    },
    inputContainer: {
        flex: 1,
        alignContent: "stretch",
        marginHorizontal: 10,
        // alignSelf: "stretch",
    },
    allSetsContainer: {
    },
    setContainer: {
        height: 100,
        width: 300,
        backgroundColor: Colors.dark_sec,
        borderColor: "rgba(148, 163, 184, 0.33)",
        borderWidth: 2,
        borderRadius: 6,
    },
    input: {
        color: Colors.dark_primary_text,
        borderBottomWidth: 1,
        borderBottomColor: Colors.dark_primary_text,
        marginBottom:4, // delete
    },
    setTitle: {
        margin: 10,
        color: Colors.dark_primary_text,
        fontSize: 20,
    },
    deleteYellowBorder: {
        borderColor: "yellow",
        borderWidth: 1,
    }
});