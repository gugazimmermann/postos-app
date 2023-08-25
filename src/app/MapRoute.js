import React, { useState, useEffect, useRef } from "react";
import { useLocalSearchParams } from "expo-router";
import MapView, { Polyline, Marker } from "react-native-maps";
import polyline from "@mapbox/polyline";
import * as Linking from "expo-linking";
import { View, Text } from "react-native";
import { useTheme, Avatar, SpeedDial } from "@rneui/themed";
import { useLocation } from "../context/location";
import { GasStationsDialog } from "../components/home/gas-stations";

export default function MapRoute() {
  const mapRef = useRef(null);
  const { gasStation } = useLocalSearchParams();
  const { theme } = useTheme();
  const { location } = useLocation();
  const [open, setOpen] = React.useState(false);
  const [coordinates, setCoordinates] = useState([]);
  const [error, setError] = useState(null);

  const [gasStationAction, setGasStationAction] = useState(false);
  const [selectedGasStation, setSelectedGasStation] = useState();

  const toggleGasStationAction = () => setGasStationAction(!gasStationAction);

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedGasStation?.latitude},${selectedGasStation?.longitude}`;
    Linking.openURL(url);
  };

  const openWaze = () => {
    const url = `https://waze.com/ul?ll=${selectedGasStation?.latitude},${selectedGasStation?.longitude}&navigate=yes`;
    Linking.openURL(url);
  };

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
    if (gasStation && location) {
      const gs = JSON.parse(gasStation);
      const d = gs?.distance > 10 ? 0.1 : gs?.distance <= 2 ? 0.02 : 0.05;
      setSelectedGasStation(gs);
      if (mapRef.current) {
        setTimeout(() => {
          mapRef.current.animateToRegion(
            {
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: d,
              longitudeDelta: d,
            },
            1000
          );
        }, 100);
      }
      if (gs.latitude && gs.longitude) fetchRoute(gs.latitude, gs.longitude);
    }
  }, [gasStation, location]);

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ width: "100%", height: "100%" }}
        initialRegion={{
          latitude: location?.latitude,
          longitude: location?.longitude,
          latitudeDelta: 7,
          longitudeDelta: 7,
        }}
      >
        <Polyline
          coordinates={coordinates}
          strokeWidth={4}
          strokeColor={theme.colors.error}
        />
        {coordinates.length > 0 && (
          <Marker
            coordinate={coordinates[coordinates.length - 1]}
            onPress={() => toggleGasStationAction()}
          >
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
        {location?.latitude && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          >
            <Avatar
              size={36}
              rounded
              icon={{
                name: "car",
                type: "material-community",
                size: 32,
                color: theme.colors.success,
              }}
              containerStyle={{ backgroundColor: theme.colors.white }}
            />
          </Marker>
        )}
      </MapView>
      <SpeedDial
        title={selectedGasStation?.name || ""}
        placement="right"
        visible={true}
        icon={{
          name: "plus-circle",
          type: "material-community",
          color: theme.colors.white,
        }}
        color={theme.colors.primary}
        openIcon={{
          name: "close-circle",
          type: "material-community",
          color: theme.colors.white,
        }}
        isOpen={open}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
      >
        <SpeedDial.Action
          color={theme.colors.primary}
          icon={{
            name: "gas-station",
            type: "material-community",
            color: theme.colors.white,
          }}
          title={selectedGasStation?.name}
          onPress={() => toggleGasStationAction()}
        />
        <SpeedDial.Action
          color={theme.colors.primary}
          icon={{
            name: "directions",
            type: "material-community",
            color: theme.colors.white,
          }}
          title="Google Maps"
          onPress={openGoogleMaps}
        />
        <SpeedDial.Action
          color={theme.colors.primary}
          icon={{
            name: "waze",
            type: "material-community",
            color: theme.colors.white,
          }}
          title="Waze"
          onPress={openWaze}
        />
      </SpeedDial>
      <GasStationsDialog
        gasStationAction={gasStationAction}
        toggleGasStationAction={toggleGasStationAction}
        gasStation={selectedGasStation}
      />
    </View>
  );
}
