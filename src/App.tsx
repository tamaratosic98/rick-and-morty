import { Route, Routes } from "react-router-dom";
import { RouteGuard } from "./components/common/RouteGuard";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
const App = () => {
  return (
    <Routes>
      <Route
        path="/home"
        element={
          <RouteGuard>
            <Home />
          </RouteGuard>
        }
      />
      <Route path="/sign-in" element={<SignIn />} />
    </Routes>
  );
};

export default App;
