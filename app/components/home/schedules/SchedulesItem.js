import { ListItem, Icon } from "@rneui/themed";
import utils from "../../../utils";
import styles from "../../../styles";
import { AwaitingIcon, ConfirmedIcon, DoneIcon } from "../icons";

export default function SchedulesItem({ schedule, showSchedule }) {
  return (
    <ListItem
      key={schedule.id}
      bottomDivider
      style={[styles.schedules.listItem]}
      containerStyle={styles.schedules.container}
      onPress={() => showSchedule(schedule)}
    >
      {schedule.done ? (
        <DoneIcon size={32} />
      ) : schedule.confirmed ? (
        <ConfirmedIcon size={32} />
      ) : (
        <AwaitingIcon size={32} />
      )}
      <ListItem.Content style={[styles.schedules.listItemContent]}>
        <ListItem.Title style={[styles.schedules.listItemText]}>
          {schedule.ScheduleService.name}
        </ListItem.Title>
        <ListItem.Subtitle style={[styles.schedules.listItemText]}>
          {schedule.GasStation.name}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Content right>
        <ListItem.Title right style={[styles.schedules.listItemText]}>
          {utils.date.toDate(schedule.date)}
        </ListItem.Title>
        <ListItem.Subtitle right style={[styles.schedules.listItemDate]}>
          {utils.date.toTime(schedule.date)} -{" "}
          {utils.date.toTime(
            utils.date.addTime(schedule.date, schedule.ScheduleService.duration)
          )}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
}
