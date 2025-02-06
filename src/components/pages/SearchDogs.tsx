import { useEffect, useState } from "react";
import { getBreeds, searchDogs, getDogsByIds } from "../services/dogServer";
import { useFavorites } from "../store/favorites/useFavorites";

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export default function SearchDogs() {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const { addFavorite } = useFavorites();

  useEffect(() => {
    async function fetchBreeds() {
      const breedList = await getBreeds();
      setBreeds(breedList);
    }
    fetchBreeds();
  }, []);

  useEffect(() => {
    async function fetchDogs() {
      const query = {
        breeds: selectedBreed ? [selectedBreed] : [],
        sort: `breed:${sortOrder}`,
        size: 10,
        from: page * 10,
      };
      const result = await searchDogs(query);
      const dogDetails = await getDogsByIds(result.resultIds);
      setDogs(dogDetails);
    }
    fetchDogs();
  }, [selectedBreed, sortOrder, page]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Search for Dogs</h1>

      {/* Breed Filter */}
      <select
        title="Select Breed"
        value={selectedBreed}
        onChange={(e) => setSelectedBreed(e.target.value)}
        className="border p-2 mt-2"
      >
        <option value="">All Breeds</option>
        {breeds.map((breed) => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))}
      </select>

      {/* Sort Order */}
      <button
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        className="ml-4 p-2 border"
      >
        Sort: {sortOrder === "asc" ? "Ascending" : "Descending"}
      </button>

      {/* Dog List */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        {dogs.map((dog) => (
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
              onClick={() => addFavorite(dog.id)}
              className="mt-2 p-2 bg-blue-500 text-white rounded"
            >
              Add to Favorites
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          className="p-2 border mr-2"
          disabled={page === 0}
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="p-2 border"
        >
          Next
        </button>
      </div>
    </div>
  );
}
