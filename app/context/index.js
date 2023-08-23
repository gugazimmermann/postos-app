import React, { useEffect, useState, createContext, useContext } from "react";
import { useRootNavigationState, router, useSegments } from "expo-router";
import utils from "../utils";

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
    await utils.storage.remove("driver");
    setAuth(null);
  };

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
