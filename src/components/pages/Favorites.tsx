import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//INFO Services
import { getDogsByIds, getMatch } from "../services/dogService";

//INFO Stores
import { useFavorites } from "../store/favorites/useFavorites";
import { useAuth } from "../store/authentication/useAuth";

//INFO UI
import Pagination from "../ui/Pagination";

//INFO Modals
import DeletionConfirmation from "../ui/modals/DeletionConfirmation";

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export default function Favorites() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { favorites, removeFavorite } = useFavorites();
  const [favoriteDogs, setFavoriteDogs] = useState<Dog[]>([]);
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDog, setSelectedDog] = useState<Dog | null>(null);

  const handleMatch = async () => {
    if (favorites.length === 0) return;
    const matchedId = await getMatch(favorites);
    const matchedDogData = favoriteDogs.find((dog) => dog.id === matchedId);
    setMatchedDog(matchedDogData || null);
  };

  // Open modal & set selected dog
  const confirmRemove = (dog: Dog) => {
    setSelectedDog(dog);
    setModalOpen(true);
  };

  // Remove the selected dog
  const handleRemove = () => {
    if (selectedDog) {
      removeFavorite(selectedDog.id);
      setFavoriteDogs((prev) =>
        prev.filter((dog) => dog.id !== selectedDog.id)
      );
    }
    setModalOpen(false);
    setSelectedDog(null);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedDog(null);
  };

  //logs the user out of the session and navigates back to the login screen
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  //dynamically grabs the favorite button and animates it
  useEffect(() => {
    async function fetchFavoriteDogs() {
      if (favorites.length > 0) {
        const dogs = await getDogsByIds(favorites);
        setFavoriteDogs(dogs);
        setTotalPages(Math.ceil(dogs.length / 10));
      }
    }
    fetchFavoriteDogs();
  }, [favorites]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-center flex-1">
          Your Favorite Dogs
        </h1>
        <div className="flex gap-4">
          {/* Back to Search button */}
          <button
            type="button"
            onClick={() => navigate("/search")}
            className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-400 duration-200 transition"
          >
            Back to Search
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

      {/* Favorite Dogs List */}
      {favoriteDogs.length === 0 ? (
        <p className="text-center text-gray-600">No favorite dogs yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 m-4">
          {/* using index also brings an issue or you sort the array after it has been mapped */}
          {favoriteDogs.map((dog) => (
            <div
              key={dog.id}
              className="relative border p-4 rounded-lg shadow-lg bg-slate-100 hover:scale-110 duration-200"
            >
              {/* Remove from Favorites Button */}
              <button
                type="button"
                onClick={() => confirmRemove(dog)}
                className="absolute top-2 right-2
                mt-3 p-2 w-fit bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
              >
                X
              </button>

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
              <p className="text-sm text-gray-600 text-center">
                Age: {dog.age}
              </p>

              {/* Dog Zip Code */}
              <p className="text-sm text-gray-600 text-center">
                Zip Code: {dog.zip_code}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Match a Dog Button */}
      {favoriteDogs.length > 0 && (
        <div className="flex justify-center my-4">
          <button
            type="button"
            onClick={handleMatch}
            className="px-4 py-2 bg-indigo-950 text-white rounded hover:bg-yellow-600 transition duration-300"
          >
            Find Your Match
          </button>
        </div>
      )}

      {/* Display Matched Dog */}
      {matchedDog && (
        <div className="mt-6 p-4 mb-16 border rounded-lg shadow-lg bg-yellow-100 text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Your Best Match
          </h2>
          <img
            src={matchedDog.img}
            alt={matchedDog.name}
            className="h-48 w-fit object-cover rounded-md mx-auto block transform transition duration-500 hover:scale-110 "
          />
          <p className="text-sm text-gray-600">Name: {matchedDog.name}</p>
          <p className="text-sm text-gray-600">Breed: {matchedDog.breed}</p>
          <p className="text-sm text-gray-600">Age: {matchedDog.age}</p>
          <p className="text-sm text-gray-600">
            Zip Code: {matchedDog.zip_code}
          </p>
        </div>
      )}

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        {favoriteDogs.length > 0 && (
          <Pagination
            // if favoriteDogs.length > 0
            page={page}
            setPage={setPage}
            totalPages={totalPages}
          />
        )}
      </div>

      {/* Deletion Confirmation Modal */}
      <DeletionConfirmation
        isOpen={modalOpen}
        onClose={closeModal}
        onConfirm={handleRemove}
        dogName={selectedDog?.name || ""}
      />
    </div>
  );
}
