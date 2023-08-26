import { View, ScrollView } from "react-native";
import { useTheme, ListItem, Text, Overlay, Button } from "@rneui/themed";
import utils from "../../../utils";

export default function GasStationsTransactionsProducts({
  visible,
  setVisible,
  products,
}) {
  const { theme } = useTheme();

  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={() => setVisible(false)}
      overlayStyle={{
        position: "absolute",
        top: 0,
        width: "94%",
        marginTop: theme.spacing.xl,
        borderRadius: theme.spacing.md,
        backgroundColor: theme.colors.background,
      }}
    >
      <ScrollView>
        <Text
          h2
          h2Style={{ color: theme.colors.text }}
          style={{ paddingBottom: theme.spacing.md }}
        >
          Produtos
        </Text>
        {products.map((product, index) => (
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
          title="FECHAR"
          onPress={() => setVisible(false)}
          radius={theme.spacing.md}
        />
      </ScrollView>
    </Overlay>
  );
}
