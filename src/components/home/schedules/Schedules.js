import React, { useState } from "react";
import { View } from "react-native";
import { Text } from "@rneui/themed";
import SchedulesItem from "./SchedulesItem";
import SchedulesDialog from "./SchedulesDialog";

export default function Schedules({ schedules }) {
  const [scheduleAction, setScheduleAction] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState();

  const showSchedule = (Schedule) => {
    setSelectedSchedule(Schedule);
    toggleScheduleAction();
  };

  const toggleScheduleAction = () => setScheduleAction(!scheduleAction);

  return (
    <>
      <Text h3 h3Style={{ marginVertical: 8 }}>
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
