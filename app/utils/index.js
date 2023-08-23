import AsyncStorage from "@react-native-async-storage/async-storage";

const save = async (name, data) => {
  try {
    await AsyncStorage.setItem(name, JSON.stringify(data));
  } catch (error) {
    console.error("Error when saving to AsyncStorage:", error);
  }
};

const load = async (name) => {
  try {
    const data = await AsyncStorage.getItem(name);
    return JSON.parse(data);
  } catch (error) {
    console.error("Error when loading from AsyncStorage:", error);
  }
};

const remove = async (name) => {
  try {
    await AsyncStorage.removeItem(name);
  } catch (error) {
    console.error("Error when saving to AsyncStorage:", error);
  }
};

const storage = { save, load, remove };

const cpf = (value) => {
  return value
    .substring(0, 14)
    .replace(/\D+/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1-$2");
};

const masks = { cpf };

const utils = { storage, masks };

export default utils;
