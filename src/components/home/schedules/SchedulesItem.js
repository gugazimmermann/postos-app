import { useTheme, ListItem } from "@rneui/themed";
import utils from "../../../utils";
import { AwaitingIcon, ConfirmedIcon, DoneIcon } from "../../icons";

export default function SchedulesItem({ schedule, showSchedule }) {
  const { theme } = useTheme();

  return (
    <ListItem
      onPress={() => showSchedule(schedule)}
      containerStyle={{
        paddingHorizontal: theme.spacing.lg,
      }}
    >
      {schedule.done ? (
        <DoneIcon size={32} color={theme.colors.secondary} />
      ) : schedule.confirmed ? (
        <ConfirmedIcon size={32} color={theme.colors.success} />
      ) : (
        <AwaitingIcon size={32} color={theme.colors.grey4} />
      )}
      <ListItem.Content>
        <ListItem.Title>{schedule.ScheduleService.name}</ListItem.Title>
        <ListItem.Subtitle>{schedule.GasStation.name}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Content right>
        <ListItem.Title>{utils.date.toDate(schedule.date)}</ListItem.Title>
        <ListItem.Subtitle>
          {utils.date.toTime(schedule.date)} -{" "}
          {utils.date.toTime(
            utils.date.addTime(schedule.date, schedule.ScheduleService.duration)
          )}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
}
