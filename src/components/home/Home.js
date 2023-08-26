import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import { useTheme, Tab, TabView, Text } from "@rneui/themed";
import { GasStationsIcon, SchedulesIcon } from "../icons";
import styles from "../../styles";
import { GasStations } from "./gas-stations";
import { Schedules } from "./schedules";

export default function Home({
  user,
  loading,
  setLoading,
  gasStations,
  schedules,
}) {
  const { theme } = useTheme();

  const [tabIndex, setTabIndex] = useState(0);

  return (
    <>
      <Tab value={tabIndex} onChange={(e) => setTabIndex(e)}>
        <Tab.Item
          title="Postos"
          icon={<GasStationsIcon size={32} color={theme.colors.white} />}
        />
        <Tab.Item
          title="Agendamentos"
          icon={<SchedulesIcon size={32} color={theme.colors.white} />}
        />
      </Tab>
      {loading ? (
        <ActivityIndicator
          size={72}
          color={theme.colors.primary}
          style={{ paddingTop: theme.spacing.xl }}
        />
      ) : (
        <>
          {user?.vehicle ? (
            <TabView
              value={tabIndex}
              onChange={setTabIndex}
              animationType="spring"
            >
              <TabView.Item style={styles.home.tabview}>
                <GasStations gasStations={gasStations} />
              </TabView.Item>
              <TabView.Item style={styles.home.tabview}>
                <Schedules schedules={schedules} />
              </TabView.Item>
            </TabView>
          ) : (
            <Text
              style={{
                backgroundColor: theme.colors.error,
                color: theme.colors.white,
                fontWeight: 'bold',
                fontSize: 19,
                textAlign: "center",
                margin: theme.spacing.lg,
                padding: theme.spacing.md,
                borderRadius: theme.spacing.lg,
              }}
            >
              Sem Veículo Selecionado
            </Text>
          )}
        </>
      )}
    </>
  );
}
