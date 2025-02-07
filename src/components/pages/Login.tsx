import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//INFO Auth
import { useAuth } from "../store/authentication/useAuth";
import { login } from "../services/authService";

//INFO Images
import fetchLogo from "../../assets/fetch.svg";

//INFO Toasts
import { showToast } from "../ui/toasts/ShowToast";
import { resetToast } from "../ui/toasts/ResetToast";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { login: setUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const loginResponse = await login(name, email);
      setUser(name, email);

      console.log("Login successful", loginResponse);

      showToast("Login successful", "success");
    } catch (error) {
      showToast("Login failed", "error");
      resetToast();
      console.error("Login failed", error);
    } finally {
      resetToast();
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/search");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          <span className="block">Welcome to</span>
          <img
            src={fetchLogo}
            alt="Fetch Logo"
            className="h-auto w-64 object-cover rounded-md mx-auto block transform transition duration-300 hover:scale-110"
          />
        </h1>

        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded mb-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setEmail(e.target.value)}
        />

        <form onSubmit={handleLogin} className="w-full">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold p-2 rounded hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
