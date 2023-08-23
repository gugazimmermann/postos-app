import React, { useState } from "react";
import { Stack } from "expo-router";
import { View } from "react-native";
import { Avatar } from "@rneui/themed";
import { useAuth } from "./context";
import { amber500 } from "./styles/colors";
import { AvatarDialog } from "./components/home";

export default function Index() {
  const { user, signOut } = useAuth();
  const [driverAction, setDriverAction] = useState(false);
  const toggleDriverAction = () => setDriverAction(!driverAction);
  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Avatar
              size={36}
              rounded
              title={user?.driver?.name?.[0] || ""}
              titleStyle={{fontSize: 21}}
              containerStyle={{ backgroundColor: amber500 }}
              onPress={toggleDriverAction}
            />
          ),
        }}
      />
      <AvatarDialog
        driverAction={driverAction}
        toggleDriverAction={toggleDriverAction}
        user={user}
        signOut={signOut}
      />
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      ></View>
    </>
  );
}
