import { Pressable, View } from "react-native";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import { useTheme, Dialog, Text, Divider } from "@rneui/themed";
import utils from "../../../utils";
import {
  EmailIcon,
  PhoneIcon,
  MapIcon,
  FacialRecognitionIcon,
  DigitalSignatureIcon,
  BiometricIcon,
  OpenIcon,
} from "../../icons";
import styles from "../../../styles";

export default function GasStationsDialog({
  gasStationAction,
  toggleGasStationAction,
  gasStation,
}) {
  const { theme } = useTheme();

  const callNumber = (phone) => {
    Linking.openURL(`tel:+55${utils.masks.callPhone(phone)}`);
  };

  const sendEmail = (email) => {
    Linking.openURL(`mailto:${email}`);
  };

  const openMap = () => {
    router.push({
      pathname: "/MapRoute",
      params: {
        gasStation: JSON.stringify(gasStation),
      },
    });
  };

  const handleSignatureTypes = (signatures) => {
    return signatures.map((signature) => {
      let IconComponent;
      switch (signature.type) {
        case "Facial Recognition":
          IconComponent = FacialRecognitionIcon;
          break;
        case "Digital Signature":
          IconComponent = DigitalSignatureIcon;
          break;
        case "Biometric":
          IconComponent = BiometricIcon;
          break;
        default:
          return null;
      }
      return (
        <IconComponent
          key={signature.type}
          size={36}
          color={signature.active ? theme.colors.success : theme.colors.grey3}
        />
      );
    });
  };

  const openProductsList = (products, name) => {
    router.push({
      pathname: "/DriverGasStationProducts",
      params: {
        products: JSON.stringify(products),
        name: name,
      },
    });
  };

  return (
    <Dialog
      isVisible={gasStationAction}
      onBackdropPress={toggleGasStationAction}
    >
      <Dialog.Title title={gasStation?.name} />
      <View
        style={[
          styles.gasStation.dialogContactContainer,
          { padding: theme.spacing.md },
        ]}
      >
        <PhoneIcon
          size={42}
          color={theme.colors.text}
          onPress={() => callNumber(gasStation?.phone)}
        />
        <MapIcon
          size={42}
          color={theme.colors.primary}
          onPress={() => openMap()}
        />
        <EmailIcon
          size={42}
          color={theme.colors.text}
          onPress={() => sendEmail(gasStation?.email)}
        />
      </View>
      <Text h4 style={{ textAlign: "center" }}>
        {gasStation?.address} - {gasStation?.city} / {gasStation?.state}{" "}
      </Text>
      <Divider
        color={theme.colors.divider}
        style={{ marginVertical: theme.spacing.lg }}
      />
      <Text h4 style={{ textAlign: "center" }}>
        Combustíveis
      </Text>
      <View
        style={[
          styles.gasStation.dialogContactContainer,
          { padding: theme.spacing.md },
        ]}
      >
        {gasStation?.vehicle?.fuelTypes?.length > 0 ? (
          <Text style={{ color: theme.colors.primary, fontWeight: "bold" }}>
            {gasStation.vehicle.fuelTypes.map((fuel) => fuel.name).join(", ")}
          </Text>
        ) : (
          <Text>Sem Restrição</Text>
        )}
      </View>
      <Divider
        color={theme.colors.divider}
        style={{ marginVertical: theme.spacing.lg }}
      />
      <Text h4 style={{ textAlign: "center" }}>
        Produtos
      </Text>
      <View
        style={[
          styles.gasStation.dialogContactContainer,
          { padding: theme.spacing.md },
        ]}
      >
        {gasStation?.driver?.products?.length > 0 ? (
          <View style={styles.gasStation.dialogContactContainer}>
            <Pressable
              onPress={() => openProductsList(gasStation.driver.products, gasStation.name)}
            >
              <Text style={{ marginRight: theme.spacing.sm }}>
                {gasStation?.driver?.products?.length} Produtos Autorizados
              </Text>
            </Pressable>
            <OpenIcon size={26} color={theme.colors.text} />
          </View>
        ) : (
          <Text>Nenhum Produto Autorizado</Text>
        )}
      </View>
      <Divider
        color={theme.colors.divider}
        style={{ marginVertical: theme.spacing.lg }}
      />
      <Text h4 style={{ textAlign: "center" }}>
        Assinaturas
      </Text>
      <View
        style={[
          styles.gasStation.dialogContactContainer,
          { padding: theme.spacing.md },
        ]}
      >
        {handleSignatureTypes(gasStation?.driver?.signatures || [])}
      </View>

      <Dialog.Actions>
        <Dialog.Button title="Fechar" onPress={toggleGasStationAction} />
      </Dialog.Actions>
    </Dialog>
  );
}
