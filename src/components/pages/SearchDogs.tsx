//SearchDogs.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//INFO Services
import { getBreeds, searchDogs, getDogsByIds } from "../services/dogService";

//INFO Stores
import { useFavorites } from "../store/favorites/useFavorites";
import { useAuth } from "../store/authentication/useAuth";

//INFO UI
import Pagination from "../ui/Pagination";

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export default function SearchDogs() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1); // Keep track of total pages
  const { addFavorite } = useFavorites();

  //adds the dog to the favorites list and animates the button
  const handleAddFavorite = (id: string) => {
    console.log("Adding to favorites:", id);

    try {
      addFavorite(id); //Adds the dog to the favorites list

      //dynamically grabs the favorite button and animates it
      const button = document.getElementById(`favoorites-${id}`);
      console.log("Add favorites Button element:", button);

      if (button) {
        button.classList.add("animate-ping");
        button.classList.add("opacity-70");
        button.setAttribute("disabled", "true");
        setTimeout(() => {
          button.classList.remove("animate-ping");
          button.classList.remove("hover:bg-amber-500");
        }, 1000);
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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
        ...(selectedBreed ? { breeds: [selectedBreed] } : {}),
        sort: `breed:${sortOrder}`,
        size: 10,
        from: page * 10,
      };

      const result = await searchDogs(query);
      console.log("result:", result);

      const dogDetails = await getDogsByIds(result.resultIds);
      console.log("dogDetails:", dogDetails);

      setDogs(dogDetails);
      setTotalPages(Math.ceil(result.total / 10)); // Calculate total pages
    }
    fetchDogs();
  }, [selectedBreed, sortOrder, page]);

  return (
    <div className="p-4">
      {/* Header with Logout Button */}
      <div className="flex justify-between items-center mb-4 ">
        <h1 className="text-2xl font-bold text-center flex-1">
          Search for Dogs
        </h1>
        <div className="flex gap-4">
          {/* View Favorites Button */}
          <button
            type="button"
            onClick={() => navigate("/favorites")}
            className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-400 duration-200 transition"
          >
            View Favorites
          </button>

          {/* Logout Button */}
          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Filters & Sorting */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
        {/* Breed Filter */}
        <select
          title="Select Breed"
          value={selectedBreed}
          onChange={(e) => setSelectedBreed(e.target.value)}
          className="p-2 border rounded bg-indigo-950 text-sm text-white focus:outline-2 focus:outline-amber-500 transition duration-300"
        >
          <option value="">All Breeds</option>
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>

        {/* Sort Order Button */}
        <button
          type="button"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="p-2 border rounded bg-indigo-950 text-sm text-white hover:bg-yellow-600 transition duration-300"
        >
          Sort: {sortOrder === "asc" ? "Ascending" : "Descending"}
        </button>
      </div>

      {/* Dog List */}
      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-6 m-4">
        {dogs.map((dog) => (
          // adds a 200ms blur delay via tailwind-motion
          <div
            key={dog.id}
            className="border p-4 rounded-lg shadow-lg bg-slate-100 motion-preset-blur-down hover:scale-110 duration-200"
            style={{ animationDelay: `${dogs.indexOf(dog) * 200}ms` }}
          >
            {/* Dog Image */}
            <img
              src={dog.img}
              alt={dog.name}
              className="h-48 w-fit object-cover rounded-md mx-auto block transform transition duration-500 hover:scale-110"
            />

            <hr className="my-2 text-amber-500" />

            {/* Dog Name */}
            <h2 className="text-lg text-gray-800 font-semibold text-center">
              {dog.name}
            </h2>

            {/* Dog Breed */}
            <p className="text-sm text-gray-600 text-center">
              Breed: {dog.breed}
            </p>

            {/* Dog Age */}
            <p className="text-sm text-gray-600 text-center">Age: {dog.age}</p>

            {/* Dog Zip Code */}
            <p className="text-sm text-gray-600 text-center">
              Zip Code: {dog.zip_code}
            </p>

            {/* Add to Favorites Button */}
            <button
              type="button"
              onClick={() => handleAddFavorite(dog.id)}
              id={`favoorites-${dog.id}`}
              className="mt-3 p-2 w-full bg-indigo-950 text-white rounded hover:bg-amber-500 transition duration-300"
            >
              + Add to Favorites
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </div>
  );
}
