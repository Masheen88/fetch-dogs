import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

//INFO Stores
import { AuthProvider } from "./components/store/authentication/AuthProvider";
import { useAuth } from "./components/store/authentication/useAuth";
import { FavoritesProvider } from "./components/store/favorites/FavoritesProvider";

//INFO Pages
import Login from "./components/pages/Login";
import SearchDogs from "./components/pages/SearchDogs";
import Favorites from "./components/pages/Favorites";

//INFO Toasts
import ToastNotification from "./components/ui/toasts/ToastNotification";

function PrivateRoute({ children }: { children: React.ReactElement }) {
  const { isAuthenticated } = useAuth(); //if authenticated, return children
  return isAuthenticated ? children : <Navigate to="/" />;
}

export default function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <ToastNotification />

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
