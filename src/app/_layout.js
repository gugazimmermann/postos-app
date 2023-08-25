import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { ThemeConsumer } from "@rneui/themed";
import { AuthProvider } from "../context/auth";
import { LocationProvider } from "../context/location";
import { Layout, Logo } from "../components";

export default function AppLayout() {
  return (
    <AuthProvider>
      <LocationProvider>
        <Layout>
          <ThemeConsumer>
            {({ theme }) => (
              <ThemeProvider value={theme}>
                <Stack
                  screenOptions={{
                    headerTitle: (props) => <Logo />,
                    headerStyle: { backgroundColor: theme.colors.background },
                    statusBarColor: theme.colors.primary,
                  }}
                >
                  <Stack.Screen
                    name="DriverGasStationProducts"
                    options={{ presentation: "modal" }}
                  />
                </Stack>
              </ThemeProvider>
            )}
          </ThemeConsumer>
        </Layout>
      </LocationProvider>
    </AuthProvider>
  );
}
