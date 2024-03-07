import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Feed from "./pages/Feed/Feed";
import Profile from "./pages/User/Profile";
import Layout from "./Layout";
import Settings from "./pages/Settings/Settings";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import SinglePost from "./pages/SinglePost/SinglePost";
import Chat from "./pages/Chat/Chat";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route element={<Feed />} path="/" />
          <Route element={<Login />} path="/login" />
          <Route element={<SinglePost />} path="/post/:postId" />
          <Route element={<Register />} path="/register" />
          <Route element={<Profile />} path="/profile" />
          <Route element={<Profile />} path="/profile/:userId" />
          <Route element={<Settings />} path="/settings" />
          <Route element={<ResetPassword />} path="/reset-password" />
          <Route element={<Chat />} path="/chat" />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
