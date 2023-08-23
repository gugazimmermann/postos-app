import { View, Image, Text } from "react-native";
import styles from "../../styles";

export default function Wellcome({ returning }) {
  return (
    <View style={[styles.signIn.container]}>
      <Image
        source={require("../../assets/logo_big.png")}
        style={[styles.signIn.logo]}
      />
      {!returning ? (
        <>
          <Text style={[styles.signIn.subtitle]}>Bem Vindo ao</Text>
          <Text style={[styles.signIn.title]}>Touch Sistemas - Postos</Text>
        </>
      ) : (
        <>
          <Text style={[styles.signIn.text]}>Bem Vindo, {returning.driver}</Text>
          <Text style={[styles.signIn.text]}>
            Sua empresa atual é: {returning.company}
          </Text>
        </>
      )}
    </View>
  );
}
