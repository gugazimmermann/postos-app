import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { View, ScrollView } from "react-native";
import { useTheme, Text, FAB } from "@rneui/themed";
import { useLocation } from "../../../context/location";
import utils from "../../../utils";
import GasStationsItem from "./GasStationsItem";
import GasStationsDialog from "./GasStationsDialog";

export default function GasStations({ gasStations }) {
  const { location } = useLocation();
  const { theme } = useTheme();

  const [gasStationsData, setGasStationsData] = useState([]);
  const [gasStationAction, setGasStationAction] = useState(false);
  const [selectedGasStation, setSelectedGasStation] = useState();

  const toggleGasStationAction = () => setGasStationAction(!gasStationAction);

  const showGasStation = (gasStation) => {
    setSelectedGasStation(gasStation);
    toggleGasStationAction();
  };

  const handleGasStationsData = (data) => {
    let orderData = null;
    if (location?.latitude && location?.longitude) {
      orderData = data.map((g) => ({
        ...g,
        distance: parseFloat(
          utils.coords
            .calculateDistance(
              location.latitude,
              location.longitude,
              g.latitude,
              g.longitude
            )
            .toFixed(2)
        ),
      }));
      orderData = utils.coords.orderByCoord(
        orderData,
        location.latitude,
        location.longitude
      );
    }
    console.log(JSON.stringify(orderData, undefined, 2));
    setGasStationsData(orderData || data);
  };

  useEffect(() => {
    if (gasStations && gasStations.length) handleGasStationsData(gasStations);
  }, [gasStations, location]);

  return (
    <>
      <Text h3 h3Style={{ marginVertical: theme.spacing.md }}>
        Postos
      </Text>
      <View style={{ width: "100%" }}>
        <ScrollView>
          {gasStationsData.length !== 0 ? (
            gasStationsData.map((gasStation, index) => (
              <GasStationsItem
                key={gasStation.id || index}
                gasStation={gasStation}
                showGasStation={showGasStation}
              />
            ))
          ) : (
            <Text h4 style={{ textAlign: "center" }}>
              Nenhum Posto Cadastrado
            </Text>
          )}
        </ScrollView>
        <GasStationsDialog
          gasStationAction={gasStationAction}
          toggleGasStationAction={toggleGasStationAction}
          gasStation={selectedGasStation}
        />
      </View>
      {gasStationsData.length !== 0 && (
        <FAB
          placement="right"
          visible={true}
          icon={{
            name: "map-marker-multiple",
            type: "material-community",
            color: theme.colors.white,
          }}
          color={theme.colors.primary}
          onPress={() =>
            router.push({
              pathname: "/MapGasStations",
              params: {
                gasStations: JSON.stringify(gasStationsData),
              },
            })
          }
        />
      )}
    </>
  );
}
