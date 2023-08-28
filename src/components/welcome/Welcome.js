import { View, Image } from "react-native";
import { useThemeMode, useTheme, Text } from "@rneui/themed";
import styles from "../../styles";

export default function Wellcome({ returning }) {
  const { mode } = useThemeMode();
  const { theme } = useTheme();

  const logo =
    mode === "light"
      ? require("../../images/logo144.png")
      : require("../../images/logo144_inverted.png");

  return (
    <View style={styles.signIn.container}>
      <Image
        source={logo}
        width={144}
        height={144}
        style={{
          marginBottom: theme.spacing.md,
        }}
      />
      {!returning ? (
        <>
          <Text h2 style={{ textAlign: "center" }}>
            Bem Vindo ao
          </Text>
          <Text h1 style={{ textAlign: "center" }}>
            {process.env.EXPO_PUBLIC_TITLE}
          </Text>
        </>
      ) : (
        <>
          <Text h3 style={{ marginBottom: theme.spacing.md }}>
            Bem Vindo, {returning.driver}
          </Text>
          <Text h4 style={{ marginBottom: theme.spacing.sm }}>
            Sua empresa atual é:
          </Text>
          <Text h4>{returning.company}</Text>
        </>
      )}
    </View>
  );
}
