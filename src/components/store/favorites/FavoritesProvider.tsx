// src/store/AuthProvider.tsx
import { useState, useMemo, ReactNode } from "react";
import { FavoritesContext } from "./FavoritesContext";

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const addFavorite = (id: string) => {
    setFavorites((prev) => [...prev, id]);
  };

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((dogId) => dogId !== id));
  };

  const value = useMemo(
    () => ({ favorites, addFavorite, removeFavorite }),
    [favorites]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
