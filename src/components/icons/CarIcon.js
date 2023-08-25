import { Icon } from "@rneui/themed";

export default function CarIcon({ size, color, onPress }) {
  return (
    <Icon
      name="car"
      type="material-community"
      color={color}
      size={size}
      onPress={onPress}
    />
  );
}
