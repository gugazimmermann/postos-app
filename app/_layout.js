import { Stack } from "expo-router";
import { ThemeProvider } from '@rneui/themed';
import { Provider } from "../context/auth";
import theme from '../styles/theme';
import { Logo } from "../components";

export default function Layout() {
  return (
    <ThemeProvider theme={theme}>
    <Provider>
      <Stack
        screenOptions={{
          headerTitle: (props) => <Logo />,
          statusBarColor: "#f59e0b",
        }}
      />
    </Provider>
    </ThemeProvider>
  );
}
