import { useTheme, Icon } from "@rneui/themed";

export default function CircleIcon({ size, color, active, onPress }) {
  const { theme } = useTheme();
  return (
    <Icon
      name="circle"
      type="material-community"
      color={color ? color : active ? theme.colors.success : theme.colors.grey3}
      size={size}
      onPress={onPress}
    />
  );
}
