import { useState } from "react";
import Input from "../../components/shared/ui/Input";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

function Login() {
  const [body, setBody] = useState({
    username: "",
    password: "",
  });
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBody((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className=" w-screen h-screen bg-white md:h-auto md:w-[25vw] rounded-3xl flex flex-col items-center py-10 px-5 gap-12">
        <div className="flex flex-col gap-5 items-center">
          <h2 className="text-3xl font-bold text-slate-700">Wandroz</h2>
          <span className="text-md text-slate-500 text-center">
            Welcome to Wandroz. Share your travel experiences
          </span>
        </div>
        <div className="flex w-full flex-col gap-6 items-center">
          <Input
            icon={
              <Icon
                icon="clarity:user-solid"
                className="text-xl text-primary"
              />
            }
            type="text"
            placeholder="Enter email or username"
            className="w-[80%] px-3 py-3"
            inputClassName="text-xxl"
            onChange={inputChangeHandler}
            name="username"
            value={body.username}
          />
          <Input
            icon={
              <Icon
                icon="mingcute:lock-fill"
                className="text-xl text-primary"
              />
            }
            type="password"
            placeholder="Enter password"
            className="w-[80%] px-3 py-3"
            inputClassName="text-xxl"
            onChange={inputChangeHandler}
            name="password"
            value={body.password}
          />
        </div>
        <div className="flex flex-col gap-3 w-full items-center">
          <span className="text-md text-blue-500 cursor-pointer">
            Forgot Password?
          </span>
          <button className="bg-primary text-white px-5 py-2 rounded-md text-lg font-semibold w-[80%]">
            Login
          </button>
          <span className="text-md text-slate-700">
            Don't have an account?
            <Link to="/register" className="text-blue-500 cursor-pointer">
              Register
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
