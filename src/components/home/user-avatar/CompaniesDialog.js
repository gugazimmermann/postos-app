import React, { useState } from "react";
import { Alert } from "react-native";
import { Dialog, CheckBox } from "@rneui/themed";
import { white, slate800 } from "../../../styles/colors";
import utils from "../../../utils";

export default function CompaniesDialog({
  setLoading,
  signIn,
  companiesAction,
  toggleCompaniesAction,
  toggleVehiclesAction,
  user,
}) {
  const [checked, setChecked] = useState(user?.company);

  const handleChangeCompany = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://192.168.1.2:5000/app/vehicles/${checked.id}/${user?.driver?.id}`
      );
      if (!res.ok) throw new Error("Houve um erro ao carregar veículos");
      const data = await res.json();
      if (Array.isArray(data) && data.length) {
        await utils.storage.save("driver", {
          ...user,
          company: checked,
          vehiclesList: data,
        });
        signIn({ ...user, company: checked, vehiclesList: data });
        toggleCompaniesAction();
        toggleVehiclesAction();
      } else if (Array.isArray(data) && !data.length) {
        Alert.alert("Atenção", "Nenhum veículo encontrado.");
      } else {
        throw new Error("Houve um erro ao carregar veículos");
      }
    } catch (error) {
      Alert.alert("Erro", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog isVisible={companiesAction} onBackdropPress={toggleCompaniesAction}>
      <Dialog.Title title="TROCAR EMPRESA" />
      {(user?.companiesList || []).map((c) => (
        <CheckBox
          containerStyle={{ backgroundColor: white, borderWidth: 0 }}
          key={c.id}
          title={c.name}
          textStyle={{ color: slate800 }}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={checked?.id === c.id}
          onPress={() => setChecked(c)}
        />
      ))}
      <Dialog.Actions>
        <Dialog.Button title="CONFIRMAR" onPress={handleChangeCompany} />
        <Dialog.Button title="CANCELAR" onPress={toggleCompaniesAction} />
      </Dialog.Actions>
    </Dialog>
  );
}
