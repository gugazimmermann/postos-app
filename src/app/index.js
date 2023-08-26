import React, { useEffect, useState } from "react";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import { Stack } from "expo-router";
import { Alert } from "react-native";
import { useTheme, Avatar } from "@rneui/themed";
import { useAuth } from "../context/auth";
import { useLocation } from "../context/location";
import * as locationEvents from "../context/locationEvents";
import { Home, AvatarDialog } from "../components/home";
import { DriverIcon } from "../components/icons";

const requestPermissions = async () => {
  const { status: foregroundStatus } =
    await Location.requestForegroundPermissionsAsync();
  if (foregroundStatus === "granted") {
    const { status: backgroundStatus } =
      await Location.requestBackgroundPermissionsAsync();
    if (backgroundStatus === "granted") {
      await Location.startLocationUpdatesAsync("background-location-task", {
        accuracy: Location.Accuracy.High,
      });
    }
  }
};

TaskManager.defineTask("background-location-task", ({ data, error }) => {
  if (error) return;
  if (data) {
    const { latitude, longitude } = data.locations[0].coords;
    locationEvents.trigger("locationUpdate", { latitude, longitude });
  }
});

export default function Index() {
  const { user, signIn, signOut } = useAuth();
  const { setLocation } = useLocation();
  const { theme } = useTheme();

  const [loading, setLoading] = useState(false);
  const [driverAction, setDriverAction] = useState(false);
  const [gasStations, setGasStations] = useState([]);
  const [schedules, setSchedules] = useState([]);

  const toggleDriverAction = () => setDriverAction(!driverAction);

  const getGasStations = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://10.255.241.197:5000/app/gas-stations/${user?.company?.id}/${user?.vehicle?.id}/${user?.driver?.id}`
      );
      if (!res.ok) throw new Error("2 Houve um erro ao carregar postos");
      const data = await res.json();
      if (Array.isArray(data) && data.length) setGasStations(data);
    } catch (error) {
      Alert.alert("Erro", error.message);
    } finally {
      setLoading(false);
    }
  };

  const getSchedules = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://10.255.241.197:5000/app/schedules/${user?.company?.id}/${user?.vehicle?.id}`
      );
      if (!res.ok) throw new Error("2 Houve um erro ao carregar agendamentos");
      const data = await res.json();
      if (Array.isArray(data) && data.length) setSchedules(data);
    } catch (error) {
      Alert.alert("Erro", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.company?.id && user?.vehicle?.id) getSchedules();
    if (user?.company?.id && user?.vehicle?.id && user?.vehicle?.id)
      getGasStations();
  }, []);

  useEffect(() => {
    requestPermissions();
    const updateLocation = (location) => setLocation(location);
    locationEvents.on("locationUpdate", updateLocation);
    return () => locationEvents.off("locationUpdate", updateLocation);
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <DriverIcon
              size={42}
              color={theme.colors.primary}
              onPress={toggleDriverAction}
            />
          ),
        }}
      />
      <AvatarDialog
        driverAction={driverAction}
        toggleDriverAction={toggleDriverAction}
        setLoading={setLoading}
        signIn={signIn}
        signOut={signOut}
        user={user}
      />
      <Home
        user={user}
        loading={loading}
        setLoading={setLoading}
        gasStations={gasStations}
        schedules={schedules}
      />
    </>
  );
}
