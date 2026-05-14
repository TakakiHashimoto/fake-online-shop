import { Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProtectedRoute from "./layouts/ProtectedRoute";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route element={<ProtectedRoute />}></Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<SignupPage />} />
    </Routes>
  );
}

export default App;
