import { Icon } from "@rneui/themed";

export default function AwaitingIcon({ size, color, onPress }) {
  return (
    <Icon
      name="calendar-clock"
      type="material-community"
      color={color}
      size={size}
      onPress={onPress}
    />
  );
}
