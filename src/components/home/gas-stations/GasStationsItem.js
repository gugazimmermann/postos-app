import { router } from "expo-router";
import { useTheme, ListItem, Button } from "@rneui/themed";
import { CircleIcon, MapMarkerIcon } from "../../icons";
import { slate500 } from "../../../styles/colors";
import styles from "../../../styles";

export default function GasStationsItem({ gasStation }) {
  const { theme } = useTheme();

  return (
    <ListItem.Swipeable
     containerStyle={{ paddingLeft: theme.spacing.md }}
      leftContent={(reset) => (
        <Button
          containerStyle={styles.gasStation.listItemButton}
          type="clear"
          icon={<MapMarkerIcon size={42} color={theme.colors.primary} />}
          onPress={() => {
            reset();
            router.push({
              pathname: "/Map",
              params: {
                gasStation: JSON.stringify({
                  name: gasStation.name,
                  latitude: gasStation.latitude,
                  longitude: gasStation.longitude,
                }),
              },
            });
          }}
        />
      )}
    >
      <CircleIcon size={16} active={gasStation.active} />
      <ListItem.Content style={{ marginLeft: theme.spacing.md }}>
        <ListItem.Title>{gasStation.name}</ListItem.Title>
        <ListItem.Subtitle>{gasStation.address}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Content right>
        <ListItem.Title>
          {gasStation.city} / {gasStation.state}
        </ListItem.Title>
        <ListItem.Subtitle>{gasStation.distance} km</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem.Swipeable>
  );
}
