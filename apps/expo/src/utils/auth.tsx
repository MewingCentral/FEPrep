import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import * as SecureStore from "expo-secure-store";

interface AuthContextValues {
  sessionId: string;
  setSessionId: Dispatch<SetStateAction<string>>;
}

export const AuthContext = createContext<AuthContextValues>({
  sessionId: "invalid",
  setSessionId: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [sessionId, setSessionId] = useState<string>("invalid");

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
