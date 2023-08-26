import React, { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, ScrollView } from "react-native";
import { useTheme, ListItem, Text } from "@rneui/themed";
import utils from "../utils";
import { CartIcon } from "../components/icons";
import Badge from "../components/badge/Badge";
import { GasStationsTransactionsProducts } from "../components/home/gas-stations";

export default function DriverGasStationTransactions() {
  const { transactions, name } = useLocalSearchParams();
  const { theme } = useTheme();
  const [gasStation, setGasStation] = useState("");
  const [transactionsList, setTransactionsList] = useState([]);

  const [visible, setVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

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
                if (transaction?.products.length) {
                  setSelectedTransaction(transaction);
                  setVisible(true);
                }
              }}
            >
              <ListItem.Content>
                <ListItem.Subtitle>
                  {utils.date.formatDateAndTime(transaction.createdAt)}
                </ListItem.Subtitle>
                <ListItem.Title>
                  {transaction.fuelType} - R${" "}
                  {utils.masks.valueToReal(totalGeneralValue)}
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
      <GasStationsTransactionsProducts
        visible={visible}
        setVisible={setVisible}
        products={selectedTransaction?.products || []}
      />
    </View>
  );
}
true;
