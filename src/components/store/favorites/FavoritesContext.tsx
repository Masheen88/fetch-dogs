import { createContext } from "react";

interface FavoritesContextType {
  favorites: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
}

// Creates a globally accessible context for favorites
export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);
