import { Icon } from "@rneui/themed";

export default function EmailIcon({ size, color, onPress }) {
  return (
    <Icon
      name="email"
      type="material-community"
      color={color}
      size={size}
      onPress={onPress}
    />
  );
}
