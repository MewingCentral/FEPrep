import React from "react";
import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs screenOptions={{}}>
            <Tabs.Screen name="studySets" options={{
                title: "Study Sets",
            }}/>
            <Tabs.Screen name="customSets" options={{
                title: "Custom Sets",
            }}/>
        </Tabs>
    );
}