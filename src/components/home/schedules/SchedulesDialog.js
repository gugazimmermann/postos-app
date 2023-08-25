import { View } from "react-native";
import { useTheme, Dialog, Text } from "@rneui/themed";
import utils from "../../../utils";
import { AwaitingIcon, ConfirmedIcon, DoneIcon } from "../../icons";
import styles from "../../../styles";

export default function SchedulesDialog({
  scheduleAction,
  toggleScheduleAction,
  schedule,
}) {
  const { theme } = useTheme();

  return (
    <Dialog isVisible={scheduleAction} onBackdropPress={toggleScheduleAction}>
      <Dialog.Title title="Agendamento" />
      {schedule?.done ? (
        <Text
          h3
          h3Style={{ color: theme.colors.secondary }}
          style={{ textAlign: "center", marginBottom: theme.spacing.md }}
        >
          Realizado
        </Text>
      ) : !schedule?.confirmed ? (
        <Text
          h3
          h3Style={{ color: theme.colors.primary }}
          style={{ textAlign: "center", marginBottom: theme.spacing.md }}
        >
          Aguardando Confirmação
        </Text>
      ) : null}
      <View>
        <Text h4 style={{ textAlign: "center" }}>
          {schedule?.ScheduleService?.name}
        </Text>
        <Text h4 style={{ textAlign: "center" }}>
          {schedule?.GasStation?.name}
        </Text>
      </View>
      <View
        style={[
          styles.schedules.dialogDateContainer,
          { padding: theme.spacing.xl },
        ]}
      >
        {schedule?.done ? (
          <DoneIcon size={32} color={theme.colors.secondary} />
        ) : schedule?.confirmed ? (
          <ConfirmedIcon size={32} color={theme.colors.success} />
        ) : (
          <AwaitingIcon size={32} color={theme.colors.grey4} />
        )}
        <View>
          <Text style={styles.schedules.dialogDate}>
            {utils.date.toDate(schedule?.date)}
          </Text>
          <Text style={[styles.schedules.dialogDate]}>
            {utils.date.toTime(schedule?.date)} -{" "}
            {utils.date.toTime(
              utils.date.addTime(
                schedule?.date,
                schedule?.ScheduleService?.duration
              )
            )}
          </Text>
        </View>
      </View>
      <Text
        style={[
          styles.schedules.listItemOptions,
          { marginTop: theme.spacing.sm },
        ]}
      >
        {(schedule?.ScheduleServiceOptions || []).map((o) => o.name).join(", ")}
      </Text>
      <Dialog.Actions>
        <Dialog.Button title="Fechar" onPress={toggleScheduleAction} />
      </Dialog.Actions>
    </Dialog>
  );
}
