import React, { useState } from "react";
import { Dialog, CheckBox } from "@rneui/themed";
import utils from "../../../utils";
import { white, slate800 } from "../../../styles/colors";

export default function VehiclesDialog({
  signIn,
  vehiclesAction,
  toggleVehiclesAction,
  vehicle,
  vehiclesList,
}) {
  const [checked, setChecked] = useState(vehicle);

  const handleChangeVehicle = async () => {
    const currentdata = await utils.storage.load("driver");
    await utils.storage.save("driver", { ...currentdata, vehicle: checked });
    signIn({ ...currentdata, vehicle: checked });
    toggleVehiclesAction();
  };

  return (
    <Dialog isVisible={vehiclesAction} onBackdropPress={toggleVehiclesAction}>
      <Dialog.Title title="Trocar Veículo" />
      {vehiclesList.map((v) => (
        <CheckBox
          containerStyle={{ backgroundColor: white, borderWidth: 0 }}
          key={v.id}
          title={`${v.manufacturer} / ${v.model} - ${v.plate}`}
          textStyle={{ color: slate800 }}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={checked.id === v.id}
          onPress={() => setChecked(v)}
        />
      ))}

      <Dialog.Actions>
        <Dialog.Button title="CONFIRMAR" onPress={handleChangeVehicle} />
        <Dialog.Button title="CANCELAR" onPress={toggleVehiclesAction} />
      </Dialog.Actions>
    </Dialog>
  );
}
