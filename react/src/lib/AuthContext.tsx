import { createContext, useContext, useState, type ReactNode } from "react";
import { getToken, setToken, clearToken } from "./api";

interface AuthContextValue {
  isAuthed: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthed, setIsAuthed] = useState<boolean>(!!getToken());

  const login = (token: string) => {
    setToken(token);
    setIsAuthed(true);
  };

  const logout = () => {
    clearToken();
    setIsAuthed(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthed, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
