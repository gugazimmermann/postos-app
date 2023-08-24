import { Icon } from "@rneui/themed";
import { sky500 } from "../../../styles/colors";

export default function DoneIcon({ size }) {
  return (
    <Icon
      name="check-bold"
      type="material-community"
      color={sky500}
      size={size}
    />
  );
}
