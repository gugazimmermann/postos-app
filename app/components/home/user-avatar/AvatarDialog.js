import { Text } from "react-native";
import { Dialog } from "@rneui/themed";

export default function AvatarDialog({
  driverAction,
  toggleDriverAction,
  user,
  signOut,
}) {
  return (
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
  );
}
