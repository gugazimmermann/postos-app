import { Icon } from "@rneui/themed";

export default function DriverIcon({ size, color, onPress }) {
  return (
    <Icon
      name="card-account-details-outline"
      type="material-community"
      color={color}
      size={size}
      onPress={onPress}
    />
  );
}
