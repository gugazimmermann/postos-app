import { Icon } from "@rneui/themed";

export default function CartIcon({ size, color, onPress }) {
  return (
    <Icon
      name="cart"
      type="material-community"
      color={color}
      size={size}
      onPress={onPress}
    />
  );
}
