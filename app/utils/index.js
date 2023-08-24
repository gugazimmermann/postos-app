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

function toDate(d) {
  if (!d) return;
  const date = new Date(d);
  return `${String(date.getDate()).padStart(2, "0")}/${String(
    date.getMonth() + 1
  ).padStart(2, "0")}/${date.getFullYear().toString()}`;
}

function toTime(d) {
  if (!d) return;
  const date = new Date(d);
  return `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}`;
}

function addTime(d, t) {
  if (!d || !t) return;
  const [hoursToAdd, minutesToAdd, secondsToAdd] = t.split(':').map(Number);
  const date = new Date(d);
  date.setHours(date.getHours() + hoursToAdd, date.getMinutes() + minutesToAdd, date.getSeconds() + secondsToAdd);
  return date;
}

const date = { toDate, toTime, addTime };

const utils = { storage, masks, date };

export default utils;
