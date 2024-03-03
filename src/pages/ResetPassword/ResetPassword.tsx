import { useState } from "react";
import Input from "../../components/shared/ui/Input";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../store/user/user-actions";

function ResetPassword() {
  const [body, setBody] = useState({
    password: "",
    confirmPassword: "",
  });
  const [searchParams] = useSearchParams();
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBody((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const resetPasswordHandler = async () => {
    try {
      await dispatch(
        resetPassword({
          ...body,
          token: searchParams.get("token") ?? "",
        })
      ).unwrap();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-[100vw] h-[100vh] bg-white flex items-center justify-center">
      <div className="p-6 flex flex-col bg-white shadow-xl rounded-md w-1/3 divide-y">
        <div className="mx-auto w-full flex flex-col gap-1 py-2">
          <img src="/logo.png" className="w-20 mx-auto" />
          <span className="font-bold text-primary mx-auto text-2xl">
            Wandroz
          </span>
        </div>
        <div className="w-full text-slate-700 font-semibold text-lg py-2">
          Reset Password
        </div>
        <div className="flex flex-col gap-3 py-2">
          <Input
            value={body.password}
            label="New Password"
            className="p-2 self-start w-full rounded-lg border"
            placeholder="New Password"
            onChange={onChangeHandler}
            name="password"
            type="password"
          />
          <Input
            value={body.confirmPassword}
            label="Confirm New Password"
            className="p-2 self-start w-full rounded-lg border"
            placeholder="Confirm New Password"
            onChange={onChangeHandler}
            name="confirmPassword"
            type="password"
          />
          <div className="w-full flex gap-2 py-3 items-center justify-center">
            <div
              onClick={resetPasswordHandler}
              className="flex px-5 py-1 cursor-pointer items-center text-lg rounded-md justify-center gap-2 self-start w-fit bg-primary text-white"
            >
              {/* {changePasswordLoading && (
              <Icon icon="gg:spinner" className="animate-spin text-xl" />
            )} */}
              Save
            </div>
            <div
              onClick={resetPasswordHandler}
              className="flex px-5 py-1 cursor-pointer items-center text-lg rounded-md justify-center gap-2 self-start w-fit bg-slate-200 text-slate-800"
            >
              Cancel
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
