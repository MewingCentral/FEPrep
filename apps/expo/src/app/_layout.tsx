import { Stack, Slot } from "expo-router";
import { Drawer } from "expo-router/drawer";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

import { TRPCProvider } from "~/utils/api";

import "../styles.css";

import { useColorScheme } from "nativewind";

import headerDefault from "~/utils/header-default";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// import DrawerContent from "components/drawer-content";
import DrawerContent from "./components/drawer-content";

import { StyleSheet } from "react-native";
import Colors from "~/utils/colors";
import { AuthProvider } from "~/utils/auth";

// Drawer stuff
const DrawerLayout = () => {
  return <Slot />;
};

// This is the main layout of the app
// It wraps your pages with the providers they need
export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  return (
    <AuthProvider>
      <TRPCProvider>
        {/*
          The Stack component displays the current page.
          It also allows you to configure your screens 
        */}
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Drawer drawerContent={DrawerContent}
            screenOptions={headerDefault(colorScheme)}
          >
            <Drawer.Screen name="index" options={{
              drawerItemStyle: { height: 0 },
            }} />
            <Drawer.Screen name="screens" options={{
              headerShown: false,
              drawerItemStyle: { height: 0 },
            }} />
            <Drawer.Screen name="dashboard" options={{
              drawerItemStyle: { height: 0 },
            }} />
            <Drawer.Screen name="components/drawer-content" options={{
              drawerItemStyle: { height: 0 },
            }} />
            <Drawer.Screen name="card-creation" options={{
              headerShown: false,
              drawerItemStyle: { height: 0 }
            }} />
          </Drawer>
        </GestureHandlerRootView>
        {/* <Stack screenOptions={headerDefault(colorScheme)}>
        <Stack.Screen
          name="card-creation"
          options={{
            headerShown: false,
          }}
        />
      </Stack> */}
        <StatusBar />
      </TRPCProvider>
    </AuthProvider>

  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    backgroundColor: Colors.dark_bg,
  },
});


// Makes screen white
// export default function RootLayout() {
//   const { colorScheme } = useColorScheme();
//   return (
//     <TRPCProvider>
//       <GestureHandlerRootView>
//         <Drawer screenOptions={headerDefault(colorScheme)}>
//           <Drawer.Screen name="card-creation"
//             options={{
//               headerShown: false,
//             }} />
//         </Drawer>
//       </GestureHandlerRootView>
//     </TRPCProvider>
//   );
// }
