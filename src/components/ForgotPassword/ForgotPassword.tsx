import { useState } from "react";
import Input from "../shared/ui/Input";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { forgotPassword } from "../../store/user/user-actions";
import { Icon } from "@iconify/react/dist/iconify.js";

function ForgotPassword({ closeModal }: { closeModal: () => void }) {
  const { changePasswordLoading } = useSelector(
    (state: RootState) => state.user
  );
  const [email, setEmail] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const forgotPasswordHandler = () => {
    dispatch(forgotPassword({ email }));
  };
  return (
    <div className="flex flex-col gap-2">
      <Input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
        name="email"
        value={email}
        className="w-full px-4 py-0 h-12 rounded-md relative"
        type="text"
        inputClassName="text-md text-slate-600"
        placeholder="Email"
        label="Email"
      />
      <div className="w-full flex justify-end gap-2">
        <button
          onClick={forgotPasswordHandler}
          className="px-3 py-2 bg-primary text-white rounded-md flex items-center gap-2"
        >
          {changePasswordLoading && (
            <Icon icon="gg:spinner" className="animate-spin" />
          )}
          Save
        </button>
        <button
          onClick={closeModal}
          className="px-3 py-2 bg-slate-100 text-slate-900 rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
