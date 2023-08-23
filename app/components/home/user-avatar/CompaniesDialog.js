import React, { useState } from "react";
import { Dialog, CheckBox } from "@rneui/themed";
import { white, slate800 } from "../../../styles/colors";

export default function CompaniesDialog({
  companiesAction,
  toggleCompaniesAction,
  company,
  companiesList,
}) {
  const [checked, setChecked] = useState(company);

  const handleChangeCompany = () => {
    console.log(checked);
  };

  return (
    <Dialog isVisible={companiesAction} onBackdropPress={toggleCompaniesAction}>
      <Dialog.Title title="Trocar Empresa" />
      {companiesList.map((c) => (
        <CheckBox
          containerStyle={{ backgroundColor: white, borderWidth: 0 }}
          key={c.id}
          title={c.name}
          textStyle={{ color: slate800 }}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={checked.id === c.id}
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
