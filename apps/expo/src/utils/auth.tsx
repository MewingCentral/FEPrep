import type {
  Dispatch,
  ReactNode,
  SetStateAction} from "react";
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import * as SecureStore from "expo-secure-store";

import type { User } from "@feprep/auth";

interface AuthContextValues {
  sessionId: string | "invalid";
  setSessionId: Dispatch<SetStateAction<string | "invalid">>;
}

export const AuthContext = createContext<AuthContextValues>({
  sessionId: "invalid",
  setSessionId: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [sessionId, setSessionId] = useState<string | "invalid">("invalid");

  useEffect(() => {
    console.log("Sesion id in useEffect", sessionId);
    SecureStore.setItem("session", sessionId);
    console.log("Secure Store Session", SecureStore.getItem("session"));
  }, [sessionId]);

  return (
    <AuthContext.Provider value={{ sessionId, setSessionId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
