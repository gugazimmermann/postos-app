import React, { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, ScrollView } from "react-native";
import { useTheme, ListItem, Text } from "@rneui/themed";
import { CircleIcon } from "../components/icons";

export default function DriverGasStationProducts() {
  const { products, name } = useLocalSearchParams();
  const { theme } = useTheme();
  const [gasStation, setGasStation] = useState("");
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    if (products && name) {
      const productsData = JSON.parse(products);
      setGasStation(name);
      setProductsList(productsData);
    }
  }, [products, name]);

  return (
    <View style={{ flex: 1 }}>
      <Text
        h2
        h2Style={{
          textAlign: "center",
          paddingVertical: theme.spacing.sm,
          color: theme.colors.white,
          backgroundColor: theme.colors.primary,
          marginBottom: theme.spacing.md,
        }}
      >
        {gasStation}
      </Text>
      <ScrollView>
        {productsList.map((product, i) => (
          <ListItem
            key={i}
            bottomDivider
            containerStyle={{
              paddingVertical: theme.spacing.md,
            }}
          >
            <CircleIcon size={21} active={product.active} />
            <ListItem.Content>
              <ListItem.Title>{product.category}</ListItem.Title>
              <ListItem.Subtitle>{product.name}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>
    </View>
  );
}
