import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
