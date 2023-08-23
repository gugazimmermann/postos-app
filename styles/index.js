import { StyleSheet } from "react-native";

const base = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    fontFamily: "Inter_400Regular",
  },
  lightContainer: {
    backgroundColor: "#f1f5f9",
  },
  darkContainer: {
    backgroundColor: "#1e293b",
  },
  lightThemeText: {
    color: "#1e293b",
  },
  darkThemeText: {
    color: "#f1f5f9",
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
    color: "#1e293b",
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
    color: "#1e293b",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1e293b",
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
    borderColor: "#f59e0b",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 16,
    color: "#1e293b",
    backgroundColor: "#f1f5f9",
  },
  text: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#1e293b",
    textAlign: "center",
    marginBottom: 10,
  },
  picker: {
    width: "100%",
    borderColor: "#f59e0b",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#f59e0b",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 10,
  },
});

const styles = { base, logo, signIn };

export default styles;
