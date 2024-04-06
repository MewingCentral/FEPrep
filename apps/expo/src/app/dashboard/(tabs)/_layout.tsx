import React, { useState } from "react";
import { Tabs, useNavigation } from "expo-router";
import { useAuth } from "~/utils/auth";

import Colors from "~/utils/colors";
import { TRPCProvider } from "~/utils/api";
import { Modal, Text } from "react-native";

export default function TabLayout() {
  const { sessionId } = useAuth();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        // tabBarStyle: [
        //   {
        //     display: "flex"
        //   },
        //   null
        // ],

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
      {
        // Only show custom sets tab if user is logged in.
        sessionId !== "invalid" ? (
          <Tabs.Screen name="custom-sets" options={{
            title: "Custom Sets",
          }} />
        ) : (
          <Tabs.Screen name="custom-sets" options={{
            title: "Custom Sets",
            // href: null,
          }}
          listeners={{
            tabPress: e => {
              e.preventDefault();
              // todo popup
            }
          }} />
        )
      }
    </Tabs>
  );
}
