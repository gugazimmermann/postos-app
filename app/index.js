import React, { useState } from "react";
import { Stack } from "expo-router";
import { Text, View } from "react-native";
import { Avatar, Dialog } from "@rneui/themed";
import { useAuth } from "./context";
import { amber500 } from "./styles/colors";

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
              size={32}
              rounded
              title={user?.driver?.name?.[0] || ""}
              containerStyle={{ backgroundColor: amber500 }}
              onPress={toggleDriverAction}
            />
          ),
        }}
      />
      <Dialog isVisible={driverAction} onBackdropPress={toggleDriverAction}>
        <Dialog.Title title={user?.driver?.name} />
        <Text>
          Você está conectado pela empresa {user?.company?.name} utilizando o
          veículo: {user?.vehicle?.manufacturer} / {user?.vehicle?.model} -{" "}
          {user?.vehicle?.plate}.
        </Text>
        <Dialog.Actions>
          {user?.companiesList?.length > 1 && (
            <Dialog.Button
              title="Trocar Empresa"
              onPress={() => console.log("Trocar Empresa")}
            />
          )}
          {user?.vehiclesList?.length > 1 && (
            <Dialog.Button
              title="Trocar Veículo"
              onPress={() => console.log("Trocar Veículo")}
            />
          )}
          <Dialog.Button title="Sair" onPress={() => signOut()} />
        </Dialog.Actions>
      </Dialog>
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      ></View>
    </>
  );
}
