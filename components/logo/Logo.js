import { View, Image, Text } from "react-native";
import styles from "../../styles";

export default function Logo() {
  return (
    <View style={[styles.logo.container]}>
      <Image
        source={require("../../assets/logo.png")}
        style={[styles.logo.image]}
      />
      <Text style={[styles.logo.text]}>Touch Sistemas - Postos</Text>
    </View>
  );
}
