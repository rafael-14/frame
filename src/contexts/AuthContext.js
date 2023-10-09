import { createContext, useCallback } from "react";
import { localStorageKeys } from "../config/localStorageKeys";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  let signedIn = !!localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

  const signin = useCallback((bool) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, bool);
    window.location.href = "/";
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    window.location.href = "/login";
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signedIn: signedIn,
        signin,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
