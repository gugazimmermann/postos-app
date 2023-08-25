import React, { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, ScrollView } from "react-native";
import { useTheme, ListItem, Text, Overlay, Icon, Button } from "@rneui/themed";

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
                setSelectedTransaction(transaction);
                setVisible(true);
              }}
            >
              <ListItem.Content>
              <ListItem.Subtitle>
                  {new Date(transaction.createdAt).toLocaleDateString()}
                </ListItem.Subtitle>
                <ListItem.Title>
                  {transaction.fuelType} - R$ {totalGeneralValue.toFixed(2)}
                </ListItem.Title>
              </ListItem.Content>
              <Icon name="list" type="font-awesome" />
            </ListItem>
          );
        })}
      </ScrollView>

      <Overlay
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
        overlayStyle={{
          position: 'absolute',
          top: 0, 
          width: '90%',
          marginTop: theme.spacing.xl
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
                    width: '100%',
                    justifyContent: "space-between",
                    marginTop: theme.spacing.sm,
                  }}
                >
                  <Text>Quantidade: {product.quantity}</Text>
                  <Text>Preço: R$ {product.price}</Text>
                </View>
                <Text style={{ width: '100%', fontWeight: "bold", textAlign: 'right' }}>
                  Total: R$ {product.totalValue}
                </Text>
              </ListItem.Content>
            </ListItem>
          ))}
          <Button title="Fechar" onPress={() => setVisible(false)} />
        </ScrollView>
      </Overlay>
    </View>
  );
}
