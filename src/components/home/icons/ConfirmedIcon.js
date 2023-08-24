import { Icon } from "@rneui/themed";
import { emerald500 } from "../../../styles/colors";

export default function ConfirmedIcon({ size }) {
  return (
    <Icon
      name="calendar-check"
      type="material-community"
      color={emerald500}
      size={size}
    />
  );
}
