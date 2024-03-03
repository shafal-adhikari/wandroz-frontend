import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import Input from "../shared/ui/Input";
import { Icon } from "@iconify/react/dist/iconify.js";
import { changePassword } from "../../store/user/user-actions";

function Notifications() {
  const { changePasswordLoading } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch: AppDispatch = useDispatch();
  const [body, setBody] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBody((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const changePasswordHandler = () => {
    if (!changePasswordLoading) {
      dispatch(changePassword(body));
    }
  };
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col">
        <span className="text-2xl text-slate-700 font-semibold">
          Change Password
        </span>
        <span className="text-md text-slate-600">
          Secure your account by changing password
        </span>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <Input
          value={body.currentPassword}
          label="Password"
          onChange={onChangeHandler}
          className="p-2 self-start w-1/2 rounded-lg border"
          placeholder="Password"
          name="currentPassword"
          type="password"
        />
        <Input
          value={body.newPassword}
          label="New Password"
          className="p-2 self-start w-1/2 rounded-lg border"
          placeholder="New Password"
          onChange={onChangeHandler}
          name="newPassword"
          type="password"
        />
        <Input
          value={body.confirmPassword}
          label="Confirm New Password"
          className="p-2 self-start w-1/2 rounded-lg border"
          placeholder="Confirm New Password"
          onChange={onChangeHandler}
          name="confirmPassword"
          type="password"
        />
        <div
          onClick={changePasswordHandler}
          className="flex px-3 py-1 cursor-pointer items-center text-lg rounded-md justify-center gap-2 self-start w-fit bg-primary text-white"
        >
          {changePasswordLoading && (
            <Icon icon="gg:spinner" className="animate-spin text-xl" />
          )}
          Save
        </div>
      </div>
    </div>
  );
}

export default Notifications;
