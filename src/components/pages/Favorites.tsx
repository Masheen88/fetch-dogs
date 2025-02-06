import { useEffect, useState } from "react";
import { getDogsByIds, getMatch } from "../services/dogServer";
import { useFavorites } from "../store/favorites/useFavorites";

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export default function Favorites() {
  const { favorites, removeFavorite } = useFavorites();
  const [favoriteDogs, setFavoriteDogs] = useState<Dog[]>([]);
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);

  useEffect(() => {
    async function fetchFavoriteDogs() {
      if (favorites.length > 0) {
        const dogs = await getDogsByIds(favorites);
        setFavoriteDogs(dogs);
      }
    }
    fetchFavoriteDogs();
  }, [favorites]);

  const handleMatch = async () => {
    if (favorites.length === 0) return;
    const matchedId = await getMatch(favorites);
    const matchedDogData = favoriteDogs.find((dog) => dog.id === matchedId);
    setMatchedDog(matchedDogData || null);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Your Favorite Dogs</h1>

      {favoriteDogs.length === 0 ? (
        <p>No favorite dogs yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 mt-4">
          {favoriteDogs.map((dog) => (
            <div key={dog.id} className="border p-4 rounded shadow">
              <img
                src={dog.img}
                alt={dog.name}
                className="w-full h-40 object-cover rounded"
              />
              <h2 className="text-lg font-semibold">{dog.name}</h2>
              <p>Breed: {dog.breed}</p>
              <p>Age: {dog.age}</p>
              <p>Zip Code: {dog.zip_code}</p>
              <button
                onClick={() => removeFavorite(dog.id)}
                className="mt-2 p-2 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {favoriteDogs.length > 0 && (
        <button
          onClick={handleMatch}
          className="mt-4 p-2 bg-green-500 text-white rounded"
        >
          Find Your Match!
        </button>
      )}

      {matchedDog && (
        <div className="mt-6 p-4 border rounded shadow bg-yellow-100">
          <h2 className="text-xl font-bold">Your Match!</h2>
          <img
            src={matchedDog.img}
            alt={matchedDog.name}
            className="w-full h-40 object-cover rounded mt-2"
          />
          <h3 className="text-lg font-semibold">{matchedDog.name}</h3>
          <p>Breed: {matchedDog.breed}</p>
          <p>Age: {matchedDog.age}</p>
          <p>Zip Code: {matchedDog.zip_code}</p>
        </div>
      )}
    </div>
  );
}
