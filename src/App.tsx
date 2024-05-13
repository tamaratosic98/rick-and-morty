import { Route, Routes } from "react-router-dom";
import { RouteGuard } from "./components/RouteGuard/RouteGuard";
import { Favorites } from "./pages/Favorites/Favorites";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RouteGuard>
            <Home />
          </RouteGuard>
        }
      />

      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  );
};

export default App;
