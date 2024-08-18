import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../config/axios.config";

function VerifyEmail() {
  const { token } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  //   const [isVerified, setIsVerified] = useState(false);
  useEffect(() => {
    axiosInstance
      .post(`/verify-user/${token}`)
      .then(() => {
        console.log("okay");
        setIsLoading(false);
        // setIsVerified(true);
      })
      .catch(() => {
        // setIsVerified(false);
      });
  }, [token]);
  return (
    <div className="w-full h-[500px] flex items-center justify-center">
      {!isLoading && (
        <div className="w-1/2 p-4 flex flex-col items-center gap-10 justify-center shadow-2xl">
          <span className="block text-2xl text-slate-600">
            Your account has been verified Please proceed to login.
          </span>
          <Link
            to="/login"
            className="bg-green-600 px-5 py-2 font-semibold flex items-center text-xl text-slate-100 rounded-md justify-center"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;
