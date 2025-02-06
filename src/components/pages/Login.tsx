import { useState } from "react";
import { useAuth } from "../store/authentication/useAuth";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { login: setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(name, email);
      setUser(name, email);
      navigate("/search");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div>
      <h1>Welcome to Fetch Dogs</h1>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
