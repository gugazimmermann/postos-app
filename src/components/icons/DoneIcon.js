import { Icon } from "@rneui/themed";

export default function DoneIcon({ size, color }) {
  return (
    <Icon
      name="check-bold"
      type="material-community"
      color={color}
      size={size}
    />
  );
}
