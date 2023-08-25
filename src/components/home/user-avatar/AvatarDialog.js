import React, { useState } from "react";
import { useTheme, Dialog, Text } from "@rneui/themed";
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
  const { theme } = useTheme();

  const [vehiclesAction, setVehiclesAction] = useState(false);
  const [companiesAction, setCompaniesAction] = useState(false);

  const toggleVehiclesAction = () => setVehiclesAction(!vehiclesAction);
  const toggleCompaniesAction = () => setCompaniesAction(!companiesAction);

  return (
    <>
      <Dialog isVisible={driverAction} onBackdropPress={toggleDriverAction}>
        <Dialog.Title title={user?.driver?.name} />
        <Text style={{paddingBottom: theme.spacing.lg}}>
          Você está conectado pela empresa {user?.company?.name} utilizando o
          veículo: {user?.vehicle?.manufacturer} / {user?.vehicle?.model} -{" "}
          {user?.vehicle?.plate}.
        </Text>
        {user?.vehiclesList?.length > 1 && (
          <Dialog.Button
            title="Trocar Veículo"
            onPress={() => {
              toggleVehiclesAction();
              toggleDriverAction();
            }}
          />
        )}
        {user?.companiesList?.length > 1 && (
          <Dialog.Button
            title="Trocar Empresa"
            onPress={() => {
              toggleCompaniesAction();
              toggleDriverAction();
            }}
          />
        )}
        <Dialog.Button title="Desconectar" onPress={() => signOut()} />
        <Dialog.Button title="Fechar" onPress={() => toggleDriverAction()} />
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
