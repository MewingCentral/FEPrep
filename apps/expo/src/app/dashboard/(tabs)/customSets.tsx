import { StyleSheet, View, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Stack } from "expo-router";

import Colors from "../../../utils/colors";

export default function Tab() {
    return(
        <SafeAreaView style={[styles.deleteYellowBorder, styles.container, styles.screenContainer]}>

            {/* Search input */}
            <View style={[styles.deleteYellowBorder, styles.container, styles.inputContainer]}>
                <TextInput style={[styles.input]} placeholder={"Enter set"} placeholderTextColor={Colors.dark_primary_text} cursorColor={Colors.dark_primary_text}/>
            </View>

            {/* Study sets */}
            <View style={[styles.deleteYellowBorder, styles.container]}>
                {/* Individual study set */}
                <View style={[styles.deleteYellowBorder, styles.container]}>

                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flexWrap: "wrap",
        alignItems: "center",
        backgroundColor: Colors.dark_bg,
    },
    screenContainer: {
        flex: 1,
        gap: 30,
        alignContent: "center", // Horizontal alignment of children
        justifyContent: "center",
        backgroundColor: Colors.dark_bg,
    },
    inputContainer: {
        
    },
    input: {
        color: Colors.dark_primary_text,
        borderBottomWidth: 1,
        borderBottomColor: Colors.dark_primary_text,
        marginBottom:4, // delete
    },
    deleteYellowBorder: {
        borderColor: "yellow",
        borderWidth: 1,
    }
});