import { Icon } from "@rneui/themed";

export default function DoneIcon({ size, color, onPress }) {
  return (
    <Icon
      name="check-bold"
      type="material-community"
      color={color}
      size={size}
      onPress={onPress}
    />
  );
}
