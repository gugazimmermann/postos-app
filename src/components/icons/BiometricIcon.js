import { Icon } from "@rneui/themed";

export default function BiometricIcon({ size, color, onPress }) {
  return (
    <Icon
      name="fingerprint"
      type="material-community"
      color={color}
      size={size}
      onPress={onPress}
    />
  );
}
