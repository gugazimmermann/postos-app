import { Icon } from "@rneui/themed";

export default function FacialRecognitionIcon({ size, color, onPress }) {
  return (
    <Icon
      name="face-recognition"
      type="material-community"
      color={color}
      size={size}
      onPress={onPress}
    />
  );
}
