import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { RadixIcon } from "radix-ui-react-native-icons";

import { View, Pressable, Text } from "react-native";
import Colors from "./colors";

export default function DrawerContent(props: any) {
    const router = useRouter();

    return (
        <View style={{ flex: 1, backgroundColor: Colors.dark_bg, }}>
            <DrawerContentScrollView {...props}
                contentContainerStyle={{ backgroundColor: Colors.dark_sec, }} 
                scrollEnabled={false}>
                <DrawerItemList {...props} />
                <DrawerItem label="Log out" 
                    labelStyle={{ color: Colors.dark_primary_text, marginLeft: -20, }}
                    icon={() => <RadixIcon name="exit" color={Colors.dark_primary_text} />}
                    onPress={() => router.replace("/")} />
                <View style={{ height: 50, justifyContent: "center", }}>
                    <Text style={{textAlign: "center", color:Colors.dark_primary_text}}>todo darkmode toggle</Text>
                </View>
            </DrawerContentScrollView>
        </View>
    );
}

