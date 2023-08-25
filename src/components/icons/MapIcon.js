import { Icon } from "@rneui/themed";
import { amber500 } from "../../styles/colors";

export default function MapIcon({ size, color, onPress }) {
  return (
    <Icon
      name="map"
      type="material-community"
      color={color}
      size={size}
      onPress={onPress}
    />
  );
}
