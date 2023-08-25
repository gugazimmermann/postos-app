import { Icon } from "@rneui/themed";

export default function ConfirmedIcon({ size, color, onPress }) {
  return (
    <Icon
      name="calendar-check"
      type="material-community"
      color={color}
      size={size}
      onPress={onPress}
    />
  );
}
