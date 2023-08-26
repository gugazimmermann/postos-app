import { View } from "react-native";
import { Text } from "@rneui/themed";

export default function Badge({ value, color, textColor }) {
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
}
