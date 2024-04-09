import { StyleSheet } from "react-native";

import Colors from "./colors";

const modalStyles = StyleSheet.create({
    container: {
        height: "80%",
        width: "95%",
        alignSelf: "center",
        // margin: "auto",
        marginVertical: "20%",
        // top: "20%",
        backgroundColor: Colors.dark_sec,
        borderWidth: 2,
        borderColor: Colors.dark_secondary_text,
        borderRadius: 6,
    },
    closeBtnContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 10,
        paddingEnd: 10,
        borderWidth: 1,
        borderColor: "yellow",
    }
});

export default modalStyles;