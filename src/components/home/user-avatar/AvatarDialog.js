import React, { useState } from "react";
import { Text } from "react-native";
import { Dialog } from "@rneui/themed";
import VehiclesDialog from "./VehiclesDialog";
import CompaniesDialog from "./CompaniesDialog";

export default function AvatarDialog({
  driverAction,
  toggleDriverAction,
  setLoading,
  signIn,
  signOut,
  user,
}) {
  const [vehiclesAction, setVehiclesAction] = useState(false);
  const [companiesAction, setCompaniesAction] = useState(false);

  const toggleVehiclesAction = () => setVehiclesAction(!vehiclesAction);
  const toggleCompaniesAction = () => setCompaniesAction(!companiesAction);

  return (
    <>
      <Dialog isVisible={driverAction} onBackdropPress={toggleDriverAction}>
        <Dialog.Title title={user?.driver?.name.toLocaleUpperCase()} />
        <Text>
          Você está conectado pela empresa {user?.company?.name} utilizando o
          veículo: {user?.vehicle?.manufacturer} / {user?.vehicle?.model} -{" "}
          {user?.vehicle?.plate}.
        </Text>
        <Dialog.Actions>
          {user?.vehiclesList?.length > 1 && (
            <Dialog.Button
              title="TROCAR VEÍCULO"
              onPress={() => {
                toggleVehiclesAction();
                toggleDriverAction();
              }}
            />
          )}
        </Dialog.Actions>
        <Dialog.Actions>
          {user?.companiesList?.length > 1 && (
            <Dialog.Button
              title="TROCAR EMPRESA"
              onPress={() => {
                toggleCompaniesAction();
                toggleDriverAction();
              }}
            />
          )}
        </Dialog.Actions>
        <Dialog.Actions>
          <Dialog.Button title="DESCONECTAR" onPress={() => signOut()} />
        </Dialog.Actions>
        <Dialog.Actions>
          <Dialog.Button title="FECHAR" onPress={() => toggleDriverAction()} />
        </Dialog.Actions>
      </Dialog>
      <VehiclesDialog
        signIn={signIn}
        vehiclesAction={vehiclesAction}
        toggleVehiclesAction={toggleVehiclesAction}
        user={user}
      />
      <CompaniesDialog
        setLoading={setLoading}
        signIn={signIn}
        companiesAction={companiesAction}
        toggleCompaniesAction={toggleCompaniesAction}
        toggleVehiclesAction={toggleVehiclesAction}
        user={user}
      />
    </>
  );
}
