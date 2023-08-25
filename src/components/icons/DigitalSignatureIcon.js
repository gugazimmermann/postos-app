import { Icon } from "@rneui/themed";

export default function DigitalSignatureIcon({ size, color, onPress }) {
  return (
    <Icon
      name="draw"
      type="material-community"
      color={color}
      size={size}
      onPress={onPress}
    />
  );
}
