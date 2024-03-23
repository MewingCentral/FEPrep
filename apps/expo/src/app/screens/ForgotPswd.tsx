import React from "react";
import { 
    SafeAreaView,
    StyleSheet,
    Text 
} from "react-native";

export default function ForgotPswd() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.containerText}> Are we doing forgot password??</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: "#f8fafa",
    },
    containerText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#020817",
        alignSelf: "center",
      },
});