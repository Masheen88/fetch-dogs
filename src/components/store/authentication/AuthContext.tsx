// src/store/AuthContext.ts
import { createContext } from "react";

interface AuthContextType {
  name: string;
  email: string;
  isAuthenticated: boolean;
  login: (name: string, email: string) => void;
  logout: () => void;
}

// Creates a globally accessible context for authentication
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
