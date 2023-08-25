import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useTheme, Text } from "@rneui/themed";
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
    console.log(location)
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
    setGasStationsData(orderData || data);
  };

  useEffect(() => {
    if (gasStations && gasStations.length) {
      const mock = [
        {
          id: "80dcc154-d3e5-4bbb-ba83-283b9dd8b514",
          name: "Posto Ilhotense",
          phone: "(47) 3343-7717",
          email: "posto_ilhota@postofernandinho.com.br",
          address: "Rua 21 de Junho, 180 - Centro",
          city: "Ilhota",
          state: "SC",
          latitude: "-26.899481",
          longitude: "-48.829216",
          active: true,
          vehicle: {
            fuelTypes: [
              {
                name: "GASOLINA COMUM",
              },
            ],
          },
          driver: {
            signatures: [
              {
                type: "Facial Recognition",
                active: true,
              },
            ],
            products: [],
          },
        },
        {
          id: "48023986-47e0-4a26-83b0-0dd93de8d3e0",
          name: "Posto Fernandinho",
          phone: "(47) 3348-8656",
          email: "posto_itajai@postofernandinho.com.br",
          address: "Rua Brusque, 786 - Centro",
          city: "Itajaí",
          state: "SC",
          latitude: "-26.914146",
          longitude: "-48.668304",
          active: true,
          vehicle: {
            fuelTypes: [],
          },
          driver: {
            signatures: [
              {
                type: "Facial Recognition",
                active: true,
              },
              {
                type: "Digital Signature",
                active: true,
              },
            ],
            products: [
              {
                category: "Limpador de Para-Brisa",
                name: "PIAA Super Silicone",
                active: true,
              },
              {
                category: "Fluido de Arrefecimento",
                name: "Mopar 10 Year/150,000 Mile Antifreeze/Coolant",
                active: true,
              },
              {
                category: "Fluido de Arrefecimento",
                name: "Toyota Genuine Long Life Coolant",
                active: true,
              },
              {
                category: "Limpador de Para-Brisa",
                name: "Bosch Icon",
                active: true,
              },
            ],
          },
        },
      ];
      handleGasStationsData(mock);
    }
  }, [gasStations, location]);

  return (
    <>
      <Text h3 h3Style={{ marginVertical: theme.spacing.md }}>
        Postos
      </Text>
      <View style={{ width: "100%" }}>
        {gasStationsData.length !== 0 ? (
          gasStationsData.map((gasStation, index) => (
            <GasStationsItem
              key={gasStation.id || index}
              gasStation={gasStation}
              showGasStation={showGasStation}
            />
          ))
        ) : (
          <Text h4 style={{ textAlign: 'center'}}>Nenhum Posto Cadastrado</Text>
        )}
        <GasStationsDialog
          gasStationAction={gasStationAction}
          toggleGasStationAction={toggleGasStationAction}
          gasStation={selectedGasStation}
        />
      </View>
    </>
  );
}
