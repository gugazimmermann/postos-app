import React, { useState } from "react";
import { View } from "react-native";
import { useTheme, Text } from "@rneui/themed";
import SchedulesItem from "./SchedulesItem";
import SchedulesDialog from "./SchedulesDialog";

export default function Schedules({ schedules }) {
  const { theme } = useTheme();

  const [scheduleAction, setScheduleAction] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState();

  const toggleScheduleAction = () => setScheduleAction(!scheduleAction);

  const showSchedule = (schedule) => {
    setSelectedSchedule(schedule);
    toggleScheduleAction();
  };

  return (
    <>
      <Text h3 h3Style={{ marginVertical: theme.spacing.md }}>
        Agendamentos
      </Text>
      <View>
        {schedules.length !== 0 ? (
          schedules.map((schedule, index) => (
            <SchedulesItem
              key={schedule.id || index}
              schedule={schedule}
              showSchedule={showSchedule}
            />
          ))
        ) : (
          <Text h4>Sem Agendamentos</Text>
        )}
        <SchedulesDialog
          scheduleAction={scheduleAction}
          toggleScheduleAction={toggleScheduleAction}
          schedule={selectedSchedule}
        />
      </View>
    </>
  );
}
