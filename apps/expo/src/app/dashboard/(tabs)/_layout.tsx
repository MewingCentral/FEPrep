import React from "react";
import { Tabs } from "expo-router";

// import { TRPCProvider } from "~/utils/api";
import { useAuth } from "~/utils/auth";
import Colors from "~/utils/colors";

export default function TabLayout() {
  const { sessionId } = useAuth();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,

        // Tab colors
        tabBarActiveBackgroundColor: Colors.dark_sec,
        tabBarInactiveBackgroundColor: "#141f31",
        tabBarActiveTintColor: Colors.dark_primary_text,
        tabBarInactiveTintColor: Colors.dark_secondary_text,

        // Tab text / labels
        tabBarLabelPosition: "beside-icon",
        tabBarStyle: {
          backgroundColor: Colors.dark_bg,
        },
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
          title: "Public sets",
        }}
      />
      {
        // Only show custom sets tab if user is logged in.
        sessionId !== "invalid" ? (
          <Tabs.Screen
            name="custom-sets"
            options={{
              title: "My sets",
            }}
          />
        ) : (
          <Tabs.Screen
            name="custom-sets"
            options={{
              title: "My sets",
              href: null,
            }}
          />
        )
      }
    </Tabs>
  );
}
