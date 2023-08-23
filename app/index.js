import React, { useState } from "react";
import { Stack } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { Avatar } from "@rneui/themed";
import { useAuth } from "./context";
import { amber500 } from "./styles/colors";
import { AvatarDialog } from "./components/home";

export default function Index() {
  const { user, signIn, signOut } = useAuth();
  const [loading, setLoading] = useState(false);
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
              titleStyle={{ fontSize: 21 }}
              containerStyle={{ backgroundColor: amber500 }}
              onPress={toggleDriverAction}
            />
          ),
        }}
      />
      <AvatarDialog
        driverAction={driverAction}
        toggleDriverAction={toggleDriverAction}
        setLoading={setLoading}
        signIn={signIn}
        signOut={signOut}
        user={user}
      />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {loading && <ActivityIndicator size="large" color={amber500} />}
      </View>
    </>
  );
}
