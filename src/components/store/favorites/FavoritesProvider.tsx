// src/store/AuthProvider.tsx
import { useState, useMemo, ReactNode } from "react";
import { FavoritesContext } from "./FavoritesContext";

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  //Adds a dog to the favorites list
  const addFavorite = (id: string) => {
    setFavorites((prev) => [...prev, id]);
  };

  //Removes a dog from the favorites list
  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((dogId) => dogId !== id));
  };

  //Memoizes the favorites to prevent unnecessary re-renders
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
