import React, { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import MapView, { Polyline, Marker } from "react-native-maps";
import polyline from "@mapbox/polyline";
import { View, Text } from "react-native";
import { useTheme, Avatar, FAB } from "@rneui/themed";
import { GasStationsDialog } from "../components/home/gas-stations";
import { CarIcon } from "../components/icons";

export default function GasStationsMap() {
  const { gasStation } = useLocalSearchParams();
  const { theme } = useTheme();

  const [coordinates, setCoordinates] = useState([]);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [gasStationAction, setGasStationAction] = useState(false);
  const [selectedGasStation, setSelectedGasStation] = useState();

  const toggleGasStationAction = () => setGasStationAction(!gasStationAction);

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
      const gs = JSON.parse(gasStation);
      setSelectedGasStation(gs);
      if (gs.latitude && gs.longitude) fetchRoute(gs.latitude, gs.longitude);
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
          strokeColor={theme.colors.error}
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
                color: theme.colors.error,
              }}
              containerStyle={{ backgroundColor: theme.colors.white }}
            />
          </Marker>
        )}
      </MapView>
      <FAB
        placement="right"
        visible={true}
        icon={{
          name: "car",
          type: "material-community",
          color: theme.colors.white,
        }}
        color={theme.colors.primary}
        onPress={() => toggleGasStationAction()}
      />
      <GasStationsDialog
        gasStationAction={gasStationAction}
        toggleGasStationAction={toggleGasStationAction}
        gasStation={selectedGasStation}
      />
    </View>
  );
}
