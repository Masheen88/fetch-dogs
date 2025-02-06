import { useState, useMemo, ReactNode, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { api } from "../../services/api";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to check if user is still authenticated
  const checkAuthStatus = async () => {
    try {
      await api.get("/dogs/breeds");
      setIsAuthenticated(true);
    } catch (error) {
      console.error("User is not authenticated", error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuthStatus(); // Runs on page load to check if user is logged in
  }, []);

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
      await api.post("/auth/logout"); // Invalidate session
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
