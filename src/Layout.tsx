import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Topbar from "./components/shared/ui/Topbar";
import axiosInstance from "./config/axios.config";

function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Add a response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  if (
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/register") ||
    location.pathname.startsWith("/reset-password") ||
    location.pathname.startsWith("/verify-user")
  )
    return children;
  else {
    return (
      <>
        <Topbar />
        {children}
      </>
    );
  }
}

export default Layout;
