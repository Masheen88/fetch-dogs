import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./components/store/authentication/AuthProvider";
import { useAuth } from "./components/store/authentication/useAuth";
import { FavoritesProvider } from "./components/store/favorites/FavoritesProvider";
import Login from "./components/pages/Login";
import SearchDogs from "./components/pages/SearchDogs";
import Favorites from "./components/pages/Favorites";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" />;
}

export default function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/search"
              element={
                <PrivateRoute>
                  <SearchDogs />
                </PrivateRoute>
              }
            />
            <Route
              path="/favorites"
              element={
                <PrivateRoute>
                  <Favorites />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </FavoritesProvider>
    </AuthProvider>
  );
}
