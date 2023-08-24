import { Icon } from "@rneui/themed";
import { amber500 } from "../../../styles/colors";

export default function MapMarkerIcon({ size }) {
  return (
    <Icon
      name="map-marker-radius"
      type="material-community"
      color={amber500}
      size={size}
    />
  );
}
