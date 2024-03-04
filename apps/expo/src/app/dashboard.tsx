import { SafeAreaView } from "react-native-safe-area-context";

import { Link, Stack } from "expo-router";

export default function Dashboard() {
    return (
        <SafeAreaView className="bg-background">
            <Stack.Screen />
        </SafeAreaView>
    );
}