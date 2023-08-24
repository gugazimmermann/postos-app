import { View, Text } from "react-native";
import { Dialog } from "@rneui/themed";
import utils from "../../../utils";
import { AwaitingIcon, ConfirmedIcon, DoneIcon } from "../icons";
import styles from "../../../styles";

export default function SchedulesDialog({
  scheduleAction,
  toggleScheduleAction,
  schedule,
}) {
  return (
    <Dialog isVisible={scheduleAction} onBackdropPress={toggleScheduleAction}>
      <Dialog.Title title="AGENDAMENTO" />
      {schedule?.done ? (
        <Text style={[styles.schedules.dialogInfoDone]}>Realizado</Text>
      ) : !schedule?.confirmed ? (
        <Text style={[styles.schedules.dialogInfoAwaiting]}>
          Aguardando Confirmação
        </Text>
      ) : null}
      <View style={[styles.schedules.dialog]}>
        <Text style={[styles.schedules.dialogTitle]}>
          {schedule?.ScheduleService?.name}
        </Text>
        <Text style={[styles.schedules.dialogTitle]}>
          {schedule?.GasStation?.name}
        </Text>
      </View>
      <View style={[styles.schedules.dialogDateContainer]}>
        {schedule?.done ? (
          <DoneIcon size={32} />
        ) : schedule?.confirmed ? (
          <ConfirmedIcon size={32} />
        ) : (
          <AwaitingIcon size={32} />
        )}
        <View>
          <Text style={[styles.schedules.dialogDate]}>
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
      <Text style={[styles.schedules.listItemOptions]}>
        {(schedule?.ScheduleServiceOptions || []).map((o) => o.name).join(", ")}
      </Text>
      <Dialog.Actions>
        <Dialog.Button title="FECHAR" onPress={toggleScheduleAction} />
      </Dialog.Actions>
    </Dialog>
  );
}
