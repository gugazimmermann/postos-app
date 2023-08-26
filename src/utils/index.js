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

const callPhone = (value) => {
  if (!value) return;
  return value.replace(/\D+/g, "");
};

const valueToReal = (v) => {
  const [i, d] = Number(v).toFixed(2).split(".");
  const r = i.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${r},${d}`;
};

const masks = { cpf, callPhone, valueToReal };

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
  const [hoursToAdd, minutesToAdd, secondsToAdd] = t.split(":").map(Number);
  const date = new Date(d);
  date.setHours(
    date.getHours() + hoursToAdd,
    date.getMinutes() + minutesToAdd,
    date.getSeconds() + secondsToAdd
  );
  return date;
}

function formatDateAndTime(date) {
  const dateObj = new Date(date);
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

const date = { toDate, toTime, addTime, formatDateAndTime };

function calculateDistance(lat1, lon1, lat2, lon2) {
  lat1 = parseFloat(lat1);
  lon1 = parseFloat(lon1);
  lat2 = parseFloat(lat2);
  lon2 = parseFloat(lon2);
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const orderByCoord = (gasStations, lat, long) => {
  if (!Array.isArray(gasStations) || !gasStations.length) return [];
  return gasStations.sort((a, b) => {
    const distanceA = calculateDistance(lat, long, a.latitude, a.longitude);
    const distanceB = calculateDistance(lat, long, b.latitude, b.longitude);
    return distanceA - distanceB;
  });
};

const coords = { orderByCoord, calculateDistance };

const utils = { storage, masks, date, coords };

export default utils;
