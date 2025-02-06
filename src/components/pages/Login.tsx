import { useState } from "react";
import { useNavigate } from "react-router-dom";

//INFO Auth
import { useAuth } from "../store/authentication/useAuth";
import { login } from "../services/authService";

//INFO Images
import fetchLogo from "../../assets/fetch.svg";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { login: setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const loginResponse = await login(name, email);
      setUser(name, email);

      console.log("Login successful", loginResponse);

      navigate("/search");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

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

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white font-semibold p-2 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}
