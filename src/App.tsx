import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Feed from "./pages/Feed/Feed";
import Profile from "./pages/User/Profile";
import Topbar from "./components/shared/ui/Topbar";

function App() {
  return (
    <BrowserRouter>
      <Topbar />
      <Routes>
        <Route element={<Feed />} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route element={<Profile />} path="/profile" />
        <Route element={<Profile />} path="/profile/:userId" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
