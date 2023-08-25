import { StyleSheet } from "react-native";

const layout = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    fontFamily: "Inter_400Regular",
  },
});

const logo = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

const signIn = StyleSheet.create({
  container: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    flex: 0.5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  documentInput: {
    height: 48,
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    height: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  picker: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
  },
});

const home = StyleSheet.create({
  tabview: {
    flex: 1,
    justifyContent: "start",
    alignItems: "center",
  },
});

const gasStation = StyleSheet.create({
  listItemButton: {
    flex: 1,
    justifyContent: "center",
  },
  dialogContactContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

const schedules = StyleSheet.create({
  dialogDateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dialogDate: {
    fontSize: 16,
    textAlign: "right",
  },
  listItemOptions: {
    fontSize: 16,
    lineHeight: 26
  },
});

const styles = { layout, logo, signIn, home, gasStation, schedules };

export default styles;
