import { Icon } from "@rneui/themed";
import { amber500 } from "../../styles/colors";

export default function MapMarkerIcon({ size, color }) {
  return (
    <Icon
      name="map-marker-radius"
      type="material-community"
      color={color}
      size={size}
    />
  );
}
