import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useTheme, Text } from "@rneui/themed";
import { useAuth } from "../../context/auth";
import utils from "../../utils";
import { Welcome } from "../../components";
import styles from "../../styles";

export default function Home() {
  const { signIn } = useAuth();
  const { theme } = useTheme();

  const [loading, setLoading] = useState(false);
  const [returning, setReturning] = useState(false);
  const [cpf, setCPF] = useState("");
  const [driver, setDriver] = useState({});
  const [company, setCompany] = useState({});
  const [vehicle, setVehicle] = useState({});
  const [companiesList, setCompaniesList] = useState([]);
  const [vehiclesList, setVehiclesList] = useState([]);

  const removeDataFromStorage = async () => {
    await utils.storage.remove("driver");
  };

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
    removeDataFromStorage();
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
        `${process.env.EXPO_PUBLIC_API_URL}/vehicles/${companyID}/${driverID}`
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
    const selectedData = companiesList.find((d) => d.Company.id === value);
    const selectedDriver = { id: selectedData.id, name: selectedData.name };
    const selectedCompany = { id: selectedData.Company.id, name: selectedData.Company.name };
    setDriver(selectedDriver);
    setCompany(selectedCompany);
    saveDataToStorage({
      driver: selectedDriver,
      company: selectedCompany,
      companiesList,
    });
    getVehicles(selectedCompany.id, selectedDriver.id);
  };

  const confirmDriver = (data) => {
    if (data.length > 1) {
      setCompaniesList(data);
    } else {
      const d = { id: data[0].id, name: data[0].name };
      const c = { id: data[0].Company.id, name: data[0].Company.name };
      setDriver(d);
      setCompany(c);
      saveDataToStorage({ driver: d, company: c, companiesList: [] });
      getVehicles(c.id, d.id);
    }
  };

  const getDriver = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/driver/${cpf}`);
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
    const data = await utils.storage.load("driver");
    if (data) {
      if (data.driver && data.company) {
        setReturning({
          driver: data.driver.name,
          company: data.company.name,
        });
        setDriver(data.driver);
        setCompany(data.company);
        setCompaniesList(data.companiesList);
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
      <View
        style={[styles.signIn.form, { paddingHorizontal: theme.spacing.xl }]}
      >
        {loading && (
          <ActivityIndicator size="large" color={theme.colors.primary} />
        )}
        {!company.id &&
        companiesList.length === 0 &&
        vehiclesList.length === 0 ? (
          <>
            <TextInput
              style={[
                styles.signIn.documentInput,
                {
                  paddingHorizontal: theme.spacing.lg,
                  marginBottom: theme.spacing.md,
                  borderColor: theme.colors.primary,
                  color: theme.colors.text,
                  backgroundColor: theme.colors.grey0,
                },
              ]}
              placeholder="Digite seu CPF"
              placeholderTextColor={theme.colors.text}
              value={utils.masks.cpf(cpf)}
              onChangeText={(value) => setCPF(utils.masks.cpf(value))}
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={[
                styles.signIn.button,
                { backgroundColor: theme.colors.primary },
              ]}
              onPress={() => getDriver()}
            >
              <Text
                style={[
                  styles.signIn.buttonText,
                  { color: theme.colors.white },
                ]}
              >
                INSIRA SEU CPF
              </Text>
            </TouchableOpacity>
          </>
        ) : !company.id &&
          companiesList.length > 0 &&
          vehiclesList.length === 0 ? (
          <>
            <Text h3 style={{ paddingBottom: theme.spacing.md }}>
              Selecione o Empresa
            </Text>
            <View
              style={[
                styles.signIn.picker,
                {
                  borderColor: theme.colors.primary,
                  marginBottom: theme.spacing.md,
                },
              ]}
            >
              <Picker
                selectedValue={company.id || ""}
                onValueChange={(itemValue) => confirmCompany(itemValue)}
                selectionColor={theme.colors.primary}
                dropdownIconColor={theme.colors.primary}
              >
                <Picker.Item
                  label="Selecione uma empresa"
                  color={theme.colors.text}
                  value=""
                />
                {companiesList.map((c) => (
                  <Picker.Item key={c.Company.id} label={c.Company.name} value={c.Company.id} />
                ))}
              </Picker>
            </View>
            <TouchableOpacity
              style={[
                styles.signIn.button,
                { backgroundColor: theme.colors.primary },
              ]}
              onPress={() => reset()}
            >
              <Text
                style={[
                  styles.signIn.buttonText,
                  { color: theme.colors.white },
                ]}
              >
                VOLTAR
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text h3 style={{ paddingBottom: theme.spacing.md }}>
              Selecione o Veículo
            </Text>
            <View
              style={[
                styles.signIn.picker,
                {
                  borderColor: theme.colors.primary,
                  marginBottom: theme.spacing.md,
                },
              ]}
            >
              <Picker
                selectedValue={vehicle.id || ""}
                onValueChange={(itemValue) => confirmVehicle(itemValue)}
                selectionColor={theme.colors.primary}
                dropdownIconColor={theme.colors.primary}
              >
                <Picker.Item
                  label="Selecione um veículo"
                  color={theme.colors.text}
                  value=""
                />
                {vehiclesList.map((v) => (
                  <Picker.Item
                    key={v.id}
                    label={`${v.plate} - ${v.manufacturer} / ${v.model}`}
                    value={v.id}
                  />
                ))}
              </Picker>
            </View>
            <TouchableOpacity
              style={[
                styles.signIn.button,
                { backgroundColor: theme.colors.primary },
              ]}
              onPress={() => reset()}
            >
              <Text
                style={[
                  styles.signIn.buttonText,
                  { color: theme.colors.white },
                ]}
              >
                VOLTAR
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </>
  );
}
