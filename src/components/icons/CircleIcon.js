import { Icon } from "@rneui/themed";
import { emerald500, slate300 } from "../../styles/colors";

export default function CircleIcon({ size, color, active }) {
  return (
    <Icon
      name="circle"
      type="material-community"
      color={color ? color : active ? emerald500 : slate300}
      size={size}
    />
  );
}
