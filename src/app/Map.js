import React, { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import MapView, { Polyline, Marker } from "react-native-maps";
import polyline from "@mapbox/polyline";
import { View, Text } from "react-native";
import { Avatar, SpeedDial } from "@rneui/themed";
import { red600, white } from "../styles/colors";

export default function GasStationsMap() {
  const { gasStation } = useLocalSearchParams();
  const [coordinates, setCoordinates] = useState([]);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const fetchRoute = async (latitude, longitude) => {
    try {
      const start = "-26.9040195,-48.6740984";
      const end = `${latitude},${longitude}`;
      const apiKey = "58c34e31-fac4-4417-8d87-ff62270593ed";
      const url = `https://graphhopper.com/api/1/route?point=${start}&point=${end}&vehicle=car&locale=pt&key=${apiKey}&type=json`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Erro ao buscar rota");
      const data = await res.json();
      if (!data.paths || !data.paths[0] || !data.paths[0].points) {
        throw new Error("Dados de rota inesperados");
      }

      const decodedPolyline = polyline.decode(data.paths[0].points);
      setCoordinates(
        decodedPolyline.map((coord) => ({
          latitude: coord[0],
          longitude: coord[1],
        }))
      );
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (gasStation) {
      const { latitude, longitude } = JSON.parse(gasStation);
      if (latitude && longitude) fetchRoute(latitude, longitude);
    }
  }, [gasStation]);

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ width: "100%", height: "100%" }}
        initialRegion={{
          latitude: -26.9040195,
          longitude: -48.6740984,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Polyline
          coordinates={coordinates}
          strokeWidth={4}
          strokeColor={red600}
        />
        {coordinates.length > 0 && (
          <Marker coordinate={coordinates[coordinates.length - 1]}>
            <Avatar
              size={36}
              rounded
              icon={{
                name: "gas-station",
                type: "material-community",
                size: 32,
                color: red600,
              }}
              containerStyle={{ backgroundColor: white }}
            />
          </Marker>
        )}
      </MapView>
      <SpeedDial
        isOpen={open}
        icon={{ name: "car", type: "material-community", color: "#fff" }}
        openIcon={{ name: "close", color: "#fff" }}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
      >
        <SpeedDial.Action
          icon={{ name: "add", color: "#fff" }}
          title="Add"
          onPress={() => console.log("Add Something")}
        />
        <SpeedDial.Action
          icon={{ name: "delete", color: "#fff" }}
          title="Delete"
          onPress={() => console.log("Delete Something")}
        />
      </SpeedDial>
    </View>
  );
}
