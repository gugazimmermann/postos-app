import { Icon } from "@rneui/themed";

export default function SchedulesIcon({ size, color, onPress }) {
  return (
    <Icon
      name="car-clock"
      type="material-community"
      color={color}
      size={size}
      onPress={onPress}
    />
  );
}
