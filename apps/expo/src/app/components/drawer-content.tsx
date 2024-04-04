import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { RadixIcon } from "radix-ui-react-native-icons";

import { View, Pressable, Text } from "react-native";
import Colors from "~/utils/colors";

// api stuff for logging out.
import { api } from "~/utils/api";
import * as SecureStore from "expo-secure-store";

export default function DrawerContent(props: any) {
    const router = useRouter();

    const signOut = api.auth.signOut.useMutation({
        onSuccess: () => {
            SecureStore.setItem("session", "invalid");
            router.push("/");
        },
        onError: (error) => {
            // todo make this better??
            console.log(error);
        }
    });

    const onSignOut = () => {
        signOut.mutate();
    };

    return (
        <View style={{ flex: 1, backgroundColor: Colors.dark_bg, }}>
            <DrawerContentScrollView {...props}
                contentContainerStyle={{ backgroundColor: Colors.dark_bg, }} 
                scrollEnabled={false}>
                <DrawerItemList {...props} />
                <DrawerItem label="Log out" style={{ borderWidth: 1, borderColor: Colors.dark_sec, }}
                    labelStyle={{ color: Colors.dark_primary_text, marginLeft: -20, }}
                    icon={() => <RadixIcon name="exit" color={Colors.dark_primary_text} />}
                    onPress={onSignOut} />
                <View style={{ height: 50, justifyContent: "center", }}>
                    <Pressable onPress={onSignOut}>
                        <Text style={{textAlign: "center", color: Colors.dark_primary_text}}>
                            todo make dark/light mode toggle
                        </Text>
                    </Pressable>
                </View>
            </DrawerContentScrollView>
        </View>
    );
}

