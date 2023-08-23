import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../context";
import utils from "../utils";
import { Welcome } from "../components";
import { amber500, slate800 } from "../styles/colors";
import styles from "../styles";

export default function Home() {
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [returning, setReturning] = useState(false);
  const [cpf, setCPF] = useState("");
  const [driver, setDriver] = useState({});
  const [company, setCompany] = useState({});
  const [vehicle, setVehicle] = useState({});
  const [companiesList, setCompaniesList] = useState([]);
  const [vehiclesList, setVehiclesList] = useState([]);

  const saveDataToStorage = async (data) => {
    const currentdata = await utils.storage.load("driver");
    await utils.storage.save("driver", { ...currentdata, ...data });
  };

  const reset = () => {
    setCPF("");
    setDriver({});
    setCompany({});
    setVehicle({});
    setCompaniesList([]);
    setVehiclesList([]);
  };

  const confirmVehicle = (value) => {
    const selectedVehicle = vehiclesList.find((x) => x.id === value);
    setVehicle(selectedVehicle);
    saveDataToStorage({
      vehicle: selectedVehicle,
      vehiclesList,
    });
    signIn({
      driver,
      company,
      vehicle: selectedVehicle,
      companiesList,
      vehiclesList,
    });
  };

  const getVehicles = async (companyID, driverID) => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://192.168.1.2:5000/app/vehicles/${companyID}/${driverID}`
      );
      if (!res.ok) throw new Error("Houve um erro ao carregar veículos");
      const data = await res.json();
      if (Array.isArray(data) && data.length) {
        setVehiclesList(data);
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

  const confirmCompany = (value) => {
    const selectedCompany = companiesList.find((x) => x.id === value);
    setCompany(selectedCompany);
    saveDataToStorage({ driver, company: selectedCompany, companiesList });
    getVehicles(selectedCompany.id, driver.id);
  };

  const confirmDriver = (data) => {
    const d = { id: data[0].id, name: data[0].name };
    setDriver(d);
    if (data.length > 1) {
      const companies = data.map((x) => ({
        id: x.Company.id,
        name: x.Company.name,
      }));
      setCompaniesList(companies);
    } else {
      const c = { id: data[0].Company.id, name: data[0].Company.name };
      setCompany(c);
      saveDataToStorage({ driver: d, company: c, companiesList: [] });
      getVehicles(c.id, d.id);
    }
  };

  const getDriver = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://192.168.1.2:5000/app/driver/${cpf}`);
      if (!res.ok) throw new Error("Houve um erro ao verificar o CPF");
      let data = await res.json();
      console.log(data);
      data = [
        {
          Company: {
            id: "12554246-c978-4328-81f1-9a8d9c196d29",
            name: "Barros LTDA",
          },
          id: "e98aed6e-bae6-4e65-a2f7-3cd9d1a2b81e",
          name: "Warley Braga",
        },
        {
          Company: {
            id: "a2c85f13-e322-4c5a-a94b-589d159efc2a",
            name: "Barros LTDA 2",
          },
          id: "e98aed6e-bae6-4e65-a2f7-3cd9d1a2b81e",
          name: "Warley Braga",
        },
        {
          Company: {
            id: "1878444c-8cec-4973-b8b1-e57ec2797989",
            name: "Barros LTDA 3",
          },
          id: "e98aed6e-bae6-4e65-a2f7-3cd9d1a2b81e",
          name: "Warley Braga 4",
        },
        {
          Company: {
            id: "1cc44b8e-8737-4790-a00a-3a5ccbbf8a77",
            name: "Barros LTDA 5",
          },
          id: "e98aed6e-bae6-4e65-a2f7-3cd9d1a2b81e",
          name: "Warley Braga",
        },
        {
          Company: {
            id: "c3b12e02-3d80-4f08-af23-ad9795e58004",
            name: "Barros LTDA 6",
          },
          id: "e98aed6e-bae6-4e65-a2f7-3cd9d1a2b81e",
          name: "Warley Braga",
        },
      ];

      if (Array.isArray(data) && data.length) {
        Alert.alert("Confirmação", `Você é ${data[0].name}?`, [
          { text: "Não", onPress: () => setCPF("") },
          { text: "Sim", onPress: () => confirmDriver(data) },
        ]);
      } else if (Array.isArray(data) && !data.length) {
        Alert.alert("Atenção", "CPF não encontrado.");
      } else {
        throw new Error("Houve um erro ao verificar o CPF");
      }
    } catch (error) {
      Alert.alert("Erro", error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadDataFromStorage = async () => {
    const data = await utils.storage.load("driver");
    if (data) {
      if (data.driver && data.company) {
        setReturning({
          driver: data.driver.name,
          company: data.company.name,
        });
        setDriver(data.driver);
        setCompany(data.company);
        if (!data.vehicle) getVehicles(data.company.id, data.driver.id);
        else signIn(data);
      }
    }
  };

  useEffect(() => {
    loadDataFromStorage();
  }, []);

  return (
    <>
      <Welcome returning={returning} />
      <View style={[styles.signIn.form]}>
        {loading && <ActivityIndicator size="large" color={amber500} />}
        {!company.id &&
        companiesList.length === 0 &&
        vehiclesList.length === 0 ? (
          <>
            <TextInput
              style={[styles.signIn.documentInput]}
              placeholder="Digite seu CPF"
              placeholderTextColor={slate800}
              value={utils.masks.cpf(cpf)}
              onChangeText={(value) => setCPF(utils.masks.cpf(value))}
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={[styles.signIn.button]}
              onPress={() => getDriver()}
            >
              <Text style={[styles.signIn.buttonText]}>INSIRA SEU CPF</Text>
            </TouchableOpacity>
          </>
        ) : !company.id &&
          companiesList.length > 0 &&
          vehiclesList.length === 0 ? (
          <>
            <Text style={[styles.signIn.text]}>Selecione o Empresa</Text>
            <View style={[styles.signIn.picker]}>
              <Picker
                selectedValue={company.id || ""}
                onValueChange={(itemValue) => confirmCompany(itemValue)}
              >
                <Picker.Item label="Selecione uma empresa" value="" />
                {companiesList.map((c) => (
                  <Picker.Item key={c.id} label={c.name} value={c.id} />
                ))}
              </Picker>
            </View>
            <TouchableOpacity
              style={[styles.signIn.button]}
              onPress={() => reset()}
            >
              <Text style={[styles.signIn.buttonText]}>VOLTAR</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={[styles.signIn.text]}>Selecione o Veículo</Text>
            <View style={[styles.signIn.picker]}>
              <Picker
                selectedValue={vehicle.id || ""}
                onValueChange={(itemValue) => confirmVehicle(itemValue)}
              >
                <Picker.Item label="Selecione um veículo" value="" />
                {vehiclesList.map((v) => (
                  <Picker.Item
                    key={v.id}
                    label={`${v.plate} | ${v.manufacturer} / ${v.model}`}
                    value={v.id}
                  />
                ))}
              </Picker>
            </View>
            <TouchableOpacity
              style={[styles.signIn.button]}
              onPress={() => reset()}
            >
              <Text style={[styles.signIn.buttonText]}>VOLTAR</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </>
  );
}
