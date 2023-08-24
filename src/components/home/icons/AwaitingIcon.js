import { Icon } from "@rneui/themed";
import { slate400 } from "../../../styles/colors";

export default function AwaitingIcon({ size }) {
  return (
    <Icon
      name="calendar-clock"
      type="material-community"
      color={slate400}
      size={size}
    />
  );
}
