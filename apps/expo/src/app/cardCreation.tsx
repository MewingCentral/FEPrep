import { StyleSheet, View, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Colors from "~/utils/colors";

export default function cardCreation() {
    return (
        <SafeAreaView style={[styles.screenContainer]}>
            <Text>card creation page</Text>
            {/* Title input */}
            <View style={{ flexDirection: "row" }}>
                <View style={[styles.deleteYellowBorder, styles.inputContainer]}>
                    <TextInput 
                        style={[styles.input]} 
                        placeholder="Enter set title" 
                        placeholderTextColor={Colors.dark_secondary_text}
                        cursorColor={Colors.dark_primary_text}/>
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
    input: {
        color: Colors.dark_primary_text,
        borderBottomWidth: 1,
        borderBottomColor: Colors.dark_primary_text,
    },
    deleteYellowBorder: {
        borderWidth: 1,
        borderColor: "yellow",
    }
});
