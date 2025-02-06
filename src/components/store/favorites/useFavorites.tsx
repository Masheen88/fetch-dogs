// src/store/useAuth.ts
import { useContext } from "react";
import { FavoritesContext } from "./FavoritesContext";

//Allows access to the favorites context globally
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context)
    throw new Error("useFavorites must be used within a FavoritesProvider");
  return context;
};
