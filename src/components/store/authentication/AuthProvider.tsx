// src/store/AuthProvider.tsx
import { useState, useMemo, ReactNode } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (userName: string, userEmail: string) => {
    setName(userName);
    setEmail(userEmail);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setName("");
    setEmail("");
    setIsAuthenticated(false);
  };

  const value = useMemo(
    () => ({ name, email, isAuthenticated, login, logout }),
    [name, email, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
