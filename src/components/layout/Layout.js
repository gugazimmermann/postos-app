import React, { useCallback } from "react";
import { ThemeProvider } from "@rneui/themed";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { useColorScheme, View } from "react-native";
import theme from "../../styles/theme";
import styles from "../../styles";

SplashScreen.preventAutoHideAsync();

export default function Layout({ children }) {
  const colorScheme = useColorScheme();

  let [fontsLoaded, fontError] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) await SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const themeContainerStyle =
    colorScheme === "light" ? styles.layout.lightContainer : styles.layout.darkContainer;

  return (
    <ThemeProvider theme={theme}>
    <SafeAreaProvider>
      <View
        style={[styles.layout.container, themeContainerStyle]}
        onLayout={onLayoutRootView}
      >
        {children}
      </View>
    </SafeAreaProvider>
    </ThemeProvider>
  );
}
