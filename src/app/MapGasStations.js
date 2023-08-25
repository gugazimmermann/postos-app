import React, { useState, useEffect, useRef } from "react";
import { useLocalSearchParams } from "expo-router";
import MapView, { Marker } from "react-native-maps";
import { View } from "react-native";
import { useTheme, Avatar, SpeedDial } from "@rneui/themed";
import { useLocation } from "../context/location";
import { GasStationsDialog } from "../components/home/gas-stations";

export default function MapGasStations() {
  const mapRef = useRef(null);
  const { gasStations } = useLocalSearchParams();
  const { theme } = useTheme();
  const { location } = useLocation();

  const [open, setOpen] = React.useState(false);
  const [gasStationsList, setGasStationsList] = useState([]);
  const [gasStationAction, setGasStationAction] = useState(false);
  const [selectedGasStation, setSelectedGasStation] = useState();

  const toggleGasStationAction = () => setGasStationAction(!gasStationAction);

  const showGasStation = (gasStation) => {
    setSelectedGasStation(gasStation);
    toggleGasStationAction();
  };

  const moveToGasStation = (g) => {
    setOpen(!open);
    if (mapRef.current) {
      setTimeout(() => {
        mapRef.current.animateToRegion(
          {
            latitude: parseFloat(g.latitude),
            longitude: parseFloat(g.longitude),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          },
          500
        );
      }, 100);
    }
  };

  useEffect(() => {
    if (gasStations && location) {
      const gs = JSON.parse(gasStations);
      setGasStationsList(gs);
      if (mapRef.current) {
        setTimeout(() => {
          mapRef.current.animateToRegion(
            {
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.07,
              longitudeDelta: 0.07,
            },
            1000
          );
        }, 100);
      }
    }
  }, [gasStations, location]);

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
        {gasStationsList.length > 0 &&
          gasStationsList.map((gasStationToShow) => (
            <Marker
              key={gasStationToShow.id}
              coordinate={{
                latitude: parseFloat(gasStationToShow.latitude),
                longitude: parseFloat(gasStationToShow.longitude),
              }}
              onPress={() => showGasStation(gasStationToShow)}
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
          ))}
      </MapView>
      <GasStationsDialog
        gasStationAction={gasStationAction}
        toggleGasStationAction={toggleGasStationAction}
        gasStation={selectedGasStation}
      />
      {gasStationsList.length > 0 && (
        <SpeedDial
          placement="right"
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
          {gasStationsList
            .slice(0, 5)
            .reverse()
            .map((gasStationToShow) => (
              <SpeedDial.Action
                key={gasStationToShow.id}
                color={theme.colors.primary}
                icon={{
                  name: "gas-station",
                  type: "material-community",
                  color: theme.colors.white,
                }}
                title={gasStationToShow.name}
                onPress={() => moveToGasStation(gasStationToShow)}
              />
            ))}
        </SpeedDial>
      )}
    </View>
  );
}
