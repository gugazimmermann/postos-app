import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import { useTheme, Tab, TabView } from "@rneui/themed";
import { GasStationsIcon, SchedulesIcon } from "../icons";
import styles from "../../styles";
import { GasStations } from "./gas-stations";
import { Schedules } from "./schedules";

export default function Home({ loading, gasStations, schedules }) {
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
        <TabView value={tabIndex} onChange={setTabIndex} animationType="spring">
          <TabView.Item style={styles.home.tabview}>
            <GasStations gasStations={gasStations} />
          </TabView.Item>
          <TabView.Item style={styles.home.tabview}>
            <Schedules schedules={schedules} />
          </TabView.Item>
        </TabView>
      )}
    </>
  );
}
