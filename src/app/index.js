import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { Avatar } from "@rneui/themed";
import { Alert } from "react-native";
import { useAuth } from "../context";
import { amber500 } from "../styles/colors";
import { Home, AvatarDialog } from "../components/home";

export default function Index() {
  const { user, signIn, signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const [driverAction, setDriverAction] = useState(false);
  const [gasStations, setGasStations] = useState([]);
  const [schedules, setSchedules] = useState([]);

  const toggleDriverAction = () => setDriverAction(!driverAction);

  const getGasStations = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://192.168.1.2:5000/app/gas-stations/${user?.company?.id}/${user?.vehicle?.id}/${user?.driver?.id}`
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
        `http://192.168.1.2:5000/app/schedules/${user?.company?.id}/${user?.vehicle?.id}`
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

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Avatar
              size={36}
              rounded
              title={user?.driver?.name?.[0] || ""}
              titleStyle={{ fontSize: 21, fontWeight: "bold" }}
              containerStyle={{ backgroundColor: amber500 }}
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
