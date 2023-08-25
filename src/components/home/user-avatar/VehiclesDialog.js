import React, { useState } from "react";
import { useTheme, Dialog, CheckBox } from "@rneui/themed";
import utils from "../../../utils";

export default function VehiclesDialog({
  signIn,
  vehiclesAction,
  toggleVehiclesAction,
  user,
}) {
  const { theme } = useTheme();

  const [checked, setChecked] = useState(user?.vehicle);

  const handleChangeVehicle = async () => {
    await utils.storage.save("driver", { ...user, vehicle: checked });
    signIn({ ...user, vehicle: checked });
    toggleVehiclesAction();
  };

  return (
    <Dialog isVisible={vehiclesAction} onBackdropPress={toggleVehiclesAction}>
      <Dialog.Title title="Trocar Veículo" />
      {(user?.vehiclesList || []).map((v) => (
        <CheckBox
          containerStyle={{ backgroundColor: theme.colors.background }}
          key={v.id}
          title={`${v.manufacturer} / ${v.model} - ${v.plate}`}
          textStyle={{ color: theme.colors.text }}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={checked?.id === v.id}
          onPress={() => setChecked(v)}
        />
      ))}
      <Dialog.Actions>
        <Dialog.Button title="Confirmar" onPress={handleChangeVehicle} />
        <Dialog.Button title="Cancelar" onPress={toggleVehiclesAction} />
      </Dialog.Actions>
    </Dialog>
  );
}
