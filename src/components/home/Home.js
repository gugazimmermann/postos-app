import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import { Tab, TabView } from "@rneui/themed";
import styles from "../../styles";
import { amber500, sky500, white } from "../../styles/colors";
import { GasStations } from "./gas-stations";
import { Schedules } from "./schedules";

export default function Home({ loading, gasStations, schedules }) {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <>
      <Tab
        value={tabIndex}
        variant="primary"
        indicatorStyle={{
          backgroundColor: sky500,
          height: 4,
        }}
        onChange={(e) => setTabIndex(e)}
      >
        <Tab.Item
          title="Postos"
          a
          titleStyle={{ fontSize: 16 }}
          icon={{
            name: "gas-station",
            type: "material-community",
            color: white,
          }}
        />
        <Tab.Item
          title="Agendamentos"
          titleStyle={{ fontSize: 16 }}
          icon={{
            name: "wrench-clock",
            type: "material-community",
            color: white,
          }}
        />
      </Tab>
      {loading ? (
        <ActivityIndicator size="large" color={amber500} />
      ) : (
        <TabView value={tabIndex} onChange={setTabIndex} animationType="spring">
          <TabView.Item style={[styles.home.tabview]}>
            <GasStations gasStations={gasStations} />
          </TabView.Item>
          <TabView.Item style={[styles.home.tabview]}>
            <Schedules schedules={schedules} />
          </TabView.Item>
        </TabView>
      )}
    </>
  );
}
