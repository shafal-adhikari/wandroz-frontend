import { useState } from "react";
import Input from "../../components/shared/ui/Input";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { login } from "../../store/auth/auth-actions";
import ForgotPassword from "../../components/ForgotPassword/ForgotPassword";
import Modal from "../../components/shared/ui/Modal";

function Login() {
  const [body, setBody] = useState({
    email: "",
    password: "",
  });
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBody((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const [isOpen, setIsOpen] = useState(false);
  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(login(body)).unwrap();
      navigate("/");
    } catch (error) {
      toast.error(error as string);
    }
  };
  return (
    <>
      <form onSubmit={loginHandler}>
        <div className="w-screen h-screen flex items-center justify-center">
          <div className=" w-screen h-screen bg-white md:h-auto md:w-[25vw] rounded-3xl flex flex-col items-center py-10 px-5 gap-12 shadow-2xl">
            <div className="flex flex-col gap-5 items-center">
              {/* <h2 className="text-3xl font-bold text-slate-700">Wandroz</h2> */}
              <img src="/logo.png" className="w-20" />
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
                placeholder="Enter email"
                className="w-full px-3 py-3"
                inputClassName="text-xxl"
                onChange={inputChangeHandler}
                name="email"
                value={body.email}
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
                className="w-full px-3 py-3"
                inputClassName="text-xxl"
                onChange={inputChangeHandler}
                name="password"
                value={body.password}
              />
            </div>
            <div className="flex flex-col gap-3 w-full items-center">
              <span
                className="text-md text-blue-500 cursor-pointer"
                onClick={() => setIsOpen(true)}
              >
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
      </form>
      <Modal
        staticBackdrop={true}
        closeModal={() => setIsOpen(false)}
        isOpen={isOpen}
        title="Forgot Password"
      >
        <ForgotPassword closeModal={() => setIsOpen(false)} />
      </Modal>
    </>
  );
}

export default Login;
