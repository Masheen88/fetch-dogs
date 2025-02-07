import { useState, useMemo, ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { api } from "../../services/api";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (userName: string, userEmail: string) => {
    try {
      await api.post("/auth/login", { name: userName, email: userEmail });
      setName(userName);
      setEmail(userEmail);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      setName("");
      setEmail("");
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const value = useMemo(
    () => ({ name, email, isAuthenticated, login, logout }),
    [name, email, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
