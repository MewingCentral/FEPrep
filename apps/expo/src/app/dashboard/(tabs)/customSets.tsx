import { StyleSheet, View, Text, TextInput, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Colors from "../../../utils/colors";

export default function Tab() {
    return(
        <SafeAreaView style={[styles.container, styles.screenContainer]}>
            {/* Search input */}
            <View style={{ flexDirection: "row" }}>
                <View style={[styles.container, styles.inputContainer]}>
                    <TextInput style={[styles.input]} placeholder={"Enter set"} placeholderTextColor={Colors.dark_secondary_text} cursorColor={Colors.dark_primary_text}/>
                </View>
            </View>

            {/* Study sets */}
            <View style={[styles.container, styles.allSetsContainer]}>
                {/* Create new set button */}
                <Pressable style={[styles.createSetButton]}>
                    <Text style={[styles.titleText]}>Create set</Text>
                    <Text style={[styles.titleText]}>+</Text>
                </Pressable>
                {/* Individual study set */}
                <View style={[styles.container, styles.setContainer]}>
                    <View  style={[styles.setTextContainer]}>
                        <Text style={[styles.setText, styles.titleText]}>Set 1</Text>
                        <Text style={[styles.setText, styles.setTerms]}>15 terms</Text>
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
        marginHorizontal: 20,
    },
    allSetsContainer: {
        gap: 20,
    },
    setContainer: {
        height: 100,
        width: 300,
        backgroundColor: Colors.dark_sec,
        borderColor: "rgba(148, 163, 184, 0.50)",
        borderWidth: 2,
        borderRadius: 6,
    },
    setTextContainer: {
        justifyContent: "space-between",
        height: 100,
    },
    input: {
        color: Colors.dark_primary_text,
        borderBottomWidth: 1,
        borderBottomColor: Colors.dark_primary_text,
    },
    createSetButton: {
        height: 60,
        width: 300,
        paddingVertical: 10,
        justifyContent: "center",
        alignItems: "center",
        borderColor: Colors.dark_primary_text,
        borderWidth: 1,
        borderRadius: 6,
    },
    titleText: {
        color: Colors.dark_primary_text,
        fontSize: 20,
    },
    setText: {
        margin: 10,
    },
    setTerms: {
        color: Colors.dark_secondary_text,
        fontSize: 16,
    },
});