import { useNavigation } from "expo-router";
import { ListItem, Button } from "@rneui/themed";
import styles from "../../../styles";
import { CircleIcon, MapMarkerIcon } from "../icons";
import { slate500 } from "../../../styles/colors";

export default function GasStationsItem({ gasStation }) {
  const navigation = useNavigation();

  return (
    <ListItem.Swipeable
      leftWidth={70}
      minSlideWidth={60}
      leftContent={() => (
        <Button
          containerStyle={styles.gasStation.listItemButton}
          type="clear"
          icon={<MapMarkerIcon size={42} />}
          onPress={() =>
            navigation.push("index", {
              screen: "Map",
              params: { gasStation },
            })
          }
        />
      )}
      bottomDivider
      style={[styles.gasStation.listItem]}
      containerStyle={styles.gasStation.container}
      pad={8}
    >
      <CircleIcon size={16} active={gasStation.active} />
      <ListItem.Content style={[styles.gasStation.listItemContent]}>
        <ListItem.Title style={[styles.gasStation.listItemName]}>
          {gasStation.name}
        </ListItem.Title>
        <ListItem.Subtitle right style={[styles.gasStation.listItemAddress]}>
          {gasStation.address}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Content right>
        <ListItem.Title right style={[styles.gasStation.listItemCity]}>
          {gasStation.city} / {gasStation.state}
        </ListItem.Title>
        <ListItem.Subtitle right style={[styles.gasStation.listItemAddress]}>
          {gasStation.distance} km
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron size={16} color={slate500} />
    </ListItem.Swipeable>
  );
}
