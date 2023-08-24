import { View } from "react-native";
import { Text } from "@rneui/themed";
import utils from "../../../utils";
import GasStationsItem from "./GasStationsItem";

let mock = [
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

mock = mock.map((d) => ({
  ...d,
  distance: parseFloat(
    utils.coords
      .calculateDistance("-26.9040195", "-48.6740984", d.latitude, d.longitude)
      .toFixed(2)
  ),
}));

mock = utils.coords.orderByCoord(mock, "-26.9040195", "-48.6740984");

// console.log(JSON.stringify(mock, undefined, 2));

export default function GasStations({ gasStations }) {
  return (
    <>
      <Text h3 h3Style={{ marginVertical: 8 }}>
        Postos
      </Text>
      <View style={{ width: "100%" }}>
        {mock.length !== 0 ? (
          mock.map((gasStation, index) => (
            <GasStationsItem
              key={gasStation.id || index}
              gasStation={gasStation}
            />
          ))
        ) : (
          <Text h4>Nenhum Posto Cadastrado</Text>
        )}
      </View>
    </>
  );
}
