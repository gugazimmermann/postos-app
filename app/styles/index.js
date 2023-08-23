import { StyleSheet } from "react-native";
import { amber500, slate100, slate800, white } from "./colors";

const layout = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    fontFamily: "Inter_400Regular",
  },
  lightContainer: {
    backgroundColor: slate100,
  },
  darkContainer: {
    backgroundColor: slate800,
  },
  lightThemeText: {
    color: slate800,
  },
  darkThemeText: {
    color: slate100,
  },
  title: {
    fontSize: 36,
  },
});

const logo = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  image: {
    width: 36,
    height: 36,
    marginRight: 8,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: slate800,
    textAlign: "center",
  },
});

const signIn = StyleSheet.create({
  container: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 144,
    height: 144,
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: slate800,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: slate800,
    textAlign: "center",
  },
  form: {
    flex: 0.5,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: "5%",
  },
  documentInput: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderColor: amber500,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 16,
    color: slate800,
    backgroundColor: slate100,
  },
  text: {
    fontSize: 21,
    fontWeight: "bold",
    color: slate800,
    textAlign: "center",
    marginBottom: 10,
  },
  picker: {
    width: "100%",
    borderColor: amber500,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: amber500,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 10,
  },
  buttonText: {
    color: white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

const styles = { layout, logo, signIn };

export default styles;
