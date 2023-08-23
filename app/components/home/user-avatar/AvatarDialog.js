import React, { useState } from "react";
import { Text } from "react-native";
import { Dialog } from "@rneui/themed";
import VehiclesDialog from "./VehiclesDialog";
import CompaniesDialog from "./CompaniesDialog";

export default function AvatarDialog({
  driverAction,
  toggleDriverAction,
  user,
  signOut,
}) {
  const [vehiclesAction, setVehiclesAction] = useState(false);
  const [companiesAction, setCompaniesAction] = useState(false);

  const toggleVehiclesAction = () => setVehiclesAction(!vehiclesAction);
  const toggleCompaniesAction = () => setCompaniesAction(!companiesAction);

  return (
    <>
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
              onPress={() => {
                toggleCompaniesAction();
                toggleDriverAction();
              }}
            />
          )}
          {user?.vehiclesList?.length > 1 && (
            <Dialog.Button
              title="Trocar Veículo"
              onPress={() => {
                toggleVehiclesAction();
                toggleDriverAction();
              }}
            />
          )}
          <Dialog.Button title="Sair" onPress={() => signOut()} />
        </Dialog.Actions>
      </Dialog>
      <VehiclesDialog
        vehiclesAction={vehiclesAction}
        toggleVehiclesAction={toggleVehiclesAction}
        vehicle={user?.vehicle}
        vehiclesList={user?.vehiclesList || []}
      />
      <CompaniesDialog
        companiesAction={companiesAction}
        toggleCompaniesAction={toggleCompaniesAction}
        company={user?.company}
        companiesList={user?.companiesList || []}
      />
    </>
  );
}
