import React, { useEffect, useState, createContext, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRootNavigationState, router, useSegments } from "expo-router";

const removeDataToStorage = async () => {
  try {
    await AsyncStorage.removeItem("driver");
  } catch (error) {
    console.error("Error when saving to AsyncStorage:", error);
  }
};

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

function useProtectedRoute(user) {
  const segments = useSegments();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (!navigationState?.key) return;
    const inAuthGroup = segments[0] === "(auth)";
    if (!user && !inAuthGroup) router.replace("/sign-in");
    else if (user && inAuthGroup) router.replace("/");
  }, [user, segments, navigationState]);
}

export function Provider(props) {
  const [user, setAuth] = useState(null);

  useProtectedRoute(user);

  const logout = async () => {
    await removeDataToStorage();
    setAuth(null)
  }

  return (
    <AuthContext.Provider
      value={{
        signIn: (user) => setAuth(user),
        signOut: () => logout(),
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
