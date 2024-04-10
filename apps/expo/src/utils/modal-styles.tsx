import { StyleSheet } from "react-native";

import Colors from "./colors";

const modalStyles = StyleSheet.create({
    container: {
        flexDirection: "column",
        width: "95%",
        alignSelf: "center",
        // margin: "auto",
        marginVertical: "20%",
        // top: "20%",
        backgroundColor: Colors.dark_sec,
        borderWidth: 2,
        borderColor: Colors.dark_secondary_text,
        borderRadius: 6,
        gap: 20,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
        paddingHorizontal: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colors.dark_secondary_text,
    },
    headerText: {
        fontSize: 30,
        color: Colors.dark_primary_text,
    },
    inputContainer: {
        flexDirection: "column",
        alignItems: "stretch",
        gap: 5,
        marginHorizontal: 10,
    },
    inputLabel: {
        fontSize: 20,
        fontWeight: "bold",
        color: Colors.dark_primary_text,
    },
    inputField: {
        color: Colors.dark_primary_text,
        padding: 8,
        borderWidth: 1,
        borderColor: Colors.dark_primary_text,
        borderRadius: 6,
    },
    inputErrorMsg: {
        marginTop: 8,
        color: Colors.dark_primary_text,
    },
    footerBtnsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: "stretch",
        paddingHorizontal: 15,
        marginVertical: 30,
    },
    footerBtn: {
        flexDirection: "column",
        justifyContent: "center",
        height: 50,
        width: 90,
        backgroundColor: Colors.light_secondary_text,
        marginHorizontal: 10,
        borderRadius: 6,
    },
    footerBtnText: {
        color: Colors.dark_primary_text,
        fontSize: 25,
        textAlign: "center",
    },
});

export default modalStyles;