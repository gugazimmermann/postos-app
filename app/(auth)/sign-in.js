import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
    try {
      await AsyncStorage.setItem("driver", JSON.stringify(data));
    } catch (error) {
      console.error("Error when saving to AsyncStorage:", error);
    }
  };

  const reset = () => {
    setCPF("");
    setDriver({});
    setCompany({});
    setVehicle({});
    setCompaniesList([]);
    setVehiclesList([]);
    saveDataToStorage({});
  };

  const confirmVehicle = (value) => {
    const selectedVehicle = vehiclesList.find((x) => x.id === value);
    setVehicle(selectedVehicle);
    saveDataToStorage({
      driver,
      company,
      companiesList,
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
      const data = await res.json();
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
    try {
      const driverData = await AsyncStorage.getItem("driver");
      if (driverData) {
        const data = JSON.parse(driverData);
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
    } catch (error) {
      console.error("Error when loading from AsyncStorage:", error);
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
        {!company.id && companiesList.length === 0 && vehiclesList.length === 0 ? (
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
        ) : !company.id && companiesList.length > 0 && vehiclesList.length === 0 ? (
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
