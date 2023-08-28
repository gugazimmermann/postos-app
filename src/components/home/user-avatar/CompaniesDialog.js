import React, { useState } from "react";
import { Alert } from "react-native";
import { useTheme, Dialog, CheckBox } from "@rneui/themed";
import utils from "../../../utils";

export default function CompaniesDialog({
  setLoading,
  signIn,
  companiesAction,
  toggleCompaniesAction,
  toggleVehiclesAction,
  user,
}) {
  const { theme } = useTheme();

  const [checked, setChecked] = useState(user?.company);

  const handleChangeCompany = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://192.168.1.2:5000/app/vehicles/${checked.Company.id}/${checked.id}`
      );
      if (!res.ok) throw new Error("Houve um erro ao carregar veículos");
      const data = await res.json();
      if (Array.isArray(data) && data.length) {
        await utils.storage.save("driver", {
          ...user,
          company: checked.Company,
          vehiclesList: data,
          vehicle: null,
        });
        signIn({
          ...user,
          driver: { id: checked.id, name: checked.name },
          company: checked.Company,
          vehiclesList: data,
          vehicle: null,
        });
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
      <Dialog.Title title="Trocar Empresa" />
      {(user?.companiesList || []).map((c) => (
        <CheckBox
          containerStyle={{ backgroundColor: theme.colors.background }}
          key={c.Company.id}
          title={c.Company.name}
          textStyle={{ color: theme.colors.text }}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={checked?.Company?.id === c.Company.id}
          onPress={() => setChecked(c)}
        />
      ))}
      <Dialog.Actions>
        <Dialog.Button title="Confirmar" onPress={handleChangeCompany} />
        <Dialog.Button title="Cancelar" onPress={toggleCompaniesAction} />
      </Dialog.Actions>
    </Dialog>
  );
}
