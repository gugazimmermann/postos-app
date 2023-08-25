import { Icon } from "@rneui/themed";

export default function OpenIcon({ size, color, onPress }) {
  return (
    <Icon
      name="open-in-app"
      type="material-community"
      color={color}
      size={size}
      onPress={onPress}
    />
  );
}
