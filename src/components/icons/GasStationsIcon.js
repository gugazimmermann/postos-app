import { Icon } from "@rneui/themed";

export default function GasStationsIcon({ size, color, onPress }) {
  return (
    <Icon
      name="gas-station"
      type="material-community"
      color={color}
      size={size}
      onPress={onPress}
    />
  );
}
