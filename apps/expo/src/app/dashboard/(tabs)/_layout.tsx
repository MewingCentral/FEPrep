import React from "react";
import { Tabs } from "expo-router";

import Colors from "~/utils/colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        // Tab colors
        tabBarActiveBackgroundColor: Colors.dark_sec,
        tabBarInactiveBackgroundColor: "#141f31",
        tabBarActiveTintColor: Colors.dark_primary_text,
        tabBarInactiveTintColor: Colors.dark_secondary_text,

        // Tab text / labels
        tabBarLabelPosition: "beside-icon",
        tabBarLabelStyle: {
          fontSize: 16,
        },
        tabBarIconStyle: {
          display: "none",
        },
      }}
    >
      <Tabs.Screen
        name="study-sets"
        options={{
          title: "Study Sets",
        }}
      />
      <Tabs.Screen
        name="custom-sets"
        options={{
          title: "Custom Sets",
        }}
      />
    </Tabs>
  );
}
