import { View, Image } from "react-native";
import { useTheme, useThemeMode, Text } from "@rneui/themed";
import styles from "../../styles";

export default function Logo() {
  const { mode } = useThemeMode();
  const { theme } = useTheme();

  const logo =
    mode === "light"
      ? require("../../images/logo36.png")
      : require("../../images/logo36_inverted.png");

  return (
    <View style={[styles.logo.container]}>
      <Image
        source={logo}
        width={36}
        height={36}
        style={[styles.logo.image, { marginRight: theme.spacing.md }]}
      />
      <Text h3 style={{ textAlign: "center" }}>
        {process.env.EXPO_PUBLIC_TITLE}
      </Text>
    </View>
  );
}
