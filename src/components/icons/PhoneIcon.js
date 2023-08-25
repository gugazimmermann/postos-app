import { Icon } from "@rneui/themed";

export default function PhoneIcon({ size, color, onPress }) {
  return (
    <Icon
      name="phone-classic"
      type="material-community"
      color={color}
      size={size}
      onPress={onPress}
    />
  );
}
