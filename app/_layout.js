import { Stack } from "expo-router";
import { Provider } from "./context";
import { amber500 } from "./styles/colors";
import { Layout, Logo } from "./components";

export default function AppLayout() {
  return (
    <Layout>
      <Provider>
        <Stack
          screenOptions={{
            headerTitle: (props) => <Logo />,
            statusBarColor: amber500,
          }}
        />
      </Provider>
    </Layout>
  );
}
