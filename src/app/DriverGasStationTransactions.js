import React, { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, ScrollView } from "react-native";
import { useTheme, ListItem, Text, Overlay, Button } from "@rneui/themed";
import utils from "../utils";
import {CartIcon} from "../components/icons";

export default function DriverGasStationTransactions() {
  const { transactions, name } = useLocalSearchParams();
  const { theme } = useTheme();
  const [gasStation, setGasStation] = useState("");
  const [transactionsList, setTransactionsList] = useState([]);

  const [visible, setVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const Badge = ({ value, color, textColor }) => {
    return (
      <View
        style={{
          position: "absolute",
          top: -10,
          right: -4,
          backgroundColor: color,
          borderRadius: 12,
          width: 24,
          height: 24,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: textColor, fontWeight: "bold" }}>{value}</Text>
      </View>
    );
  };

  useEffect(() => {
    if (transactions && name) {
      const transactionsData = JSON.parse(transactions);
      const sortedTransactions = transactionsData.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setGasStation(name);
      setTransactionsList(sortedTransactions);
    }
  }, [transactions, name]);

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
        {transactionsList.map((transaction, index) => {
          const productsValueSum = transaction.products.reduce(
            (sum, product) => sum + parseFloat(product.totalValue),
            0
          );
          const totalGeneralValue =
            parseFloat(transaction.totalValue) + productsValueSum;
          return (
            <ListItem
              key={index}
              bottomDivider
              onPress={() => {
                setSelectedTransaction(transaction);
                setVisible(true);
              }}
            >
              <ListItem.Content>
                <ListItem.Subtitle>
                  {utils.date.formatDateAndTime(transaction.createdAt)}
                </ListItem.Subtitle>
                <ListItem.Title>
                  {transaction.fuelType} - R$ {utils.masks.valueToReal(totalGeneralValue)}
                </ListItem.Title>
              </ListItem.Content>
              <View>
                <CartIcon size={34} color={theme.colors.text} />
                {transaction.products.length > 0 && (
                  <Badge
                    value={transaction.products.length}
                    color={theme.colors.primary}
                    textColor={theme.colors.white}
                  />
                )}
              </View>
            </ListItem>
          );
        })}
      </ScrollView>

      <Overlay
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
        overlayStyle={{
          position: "absolute",
          top: 0,
          width: "94%",
          marginTop: theme.spacing.xl,
          borderRadius: theme.spacing.md,
        }}
      >
        <ScrollView>
          <Text h2 style={{ paddingBottom: theme.spacing.md }}>
            Produtos
          </Text>
          {selectedTransaction?.products.map((product, index) => (
            <ListItem
              key={index}
              bottomDivider
              containerStyle={{
                marginBottom: theme.spacing.md,
                paddingHorizontal: theme.spacing.md,
                paddingVertical: theme.spacing.xs,
              }}
            >
              <ListItem.Content>
                <ListItem.Subtitle>{product.category}</ListItem.Subtitle>
                <ListItem.Title>{product.name}</ListItem.Title>
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                    marginTop: theme.spacing.sm,
                  }}
                >
                  <Text>Quantidade: {product.quantity}</Text>
                  <Text>Preço: R$ {utils.masks.valueToReal(product.price)}</Text>
                </View>
                <Text
                  style={{
                    width: "100%",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  Total: R$ {utils.masks.valueToReal(product.totalValue)}
                </Text>
              </ListItem.Content>
            </ListItem>
          ))}
          <Button
            title="Fechar"
            onPress={() => setVisible(false)}
            radius={theme.spacing.md}
          />
        </ScrollView>
      </Overlay>
    </View>
  );
}
true;
