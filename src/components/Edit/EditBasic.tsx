import { useEffect, useState } from "react";
import Input from "../shared/ui/Input";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getProfile, updateBasicInfos } from "../../store/user/user-actions";

export function EditBasic({ closeModal }: { closeModal: () => void }) {
  const { user, updateLoading } = useSelector((state: RootState) => state.user);
  const [basicInfos, setBasicInfos] = useState({
    quote: "",
    location: "",
    work: "",
    firstName: "",
    lastName: "",
    school: "",
  });
  const dispatch: AppDispatch = useDispatch();
  const saveBasicInfoHandler = async () => {
    await dispatch(updateBasicInfos(basicInfos))
      .unwrap()
      .then(() => {
        closeModal();
        dispatch(getProfile());
      });
  };
  useEffect(() => {
    if (user) {
      setBasicInfos({
        work: user.work,
        location: user.location,
        firstName: user.firstName,
        lastName: user.lastName,
        school: user.school,
        quote: user.quote,
      });
    }
  }, [user]);
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBasicInfos((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  return (
    <div className="flex flex-col w-full gap-3">
      <Input
        onChange={onChangeHandler}
        name="firstName"
        value={basicInfos.firstName}
        className="w-full px-4 py-0 h-12 rounded-md relative"
        type="text"
        inputClassName="text-md text-slate-600"
        placeholder="First Name"
        label="First Name"
      />
      <Input
        onChange={onChangeHandler}
        name="lastName"
        value={basicInfos.lastName}
        className="w-full px-4 py-0 h-12 rounded-md relative"
        type="text"
        inputClassName="text-md text-slate-600"
        placeholder="Last Name"
        label="Last Name"
      />
      <Input
        onChange={onChangeHandler}
        name="quote"
        value={basicInfos.quote}
        className="w-full px-4 py-0 h-12 rounded-md relative"
        type="text"
        inputClassName="text-md text-slate-600"
        placeholder="Bio"
        label="Bio"
      />
      <Input
        onChange={onChangeHandler}
        name="location"
        value={basicInfos.location}
        className="w-full px-4 py-0 h-12 rounded-md relative"
        type="text"
        inputClassName="text-md text-slate-600"
        placeholder="Location"
        label="Location"
      />
      <Input
        onChange={onChangeHandler}
        name="work"
        value={basicInfos.work}
        className="w-full px-4 py-0 h-12 rounded-md relative"
        type="text"
        inputClassName="text-md text-slate-600"
        placeholder="Work Place"
        label="Work Place"
      />
      <Input
        onChange={onChangeHandler}
        name="school"
        value={basicInfos.school}
        className="w-full px-4 py-0 h-12 relative"
        type="text"
        inputClassName="text-md text-slate-600"
        placeholder="School / College Name"
        label="School / College Name"
      />
      <div className="w-full flex justify-end gap-2">
        <button
          onClick={saveBasicInfoHandler}
          className="px-3 py-2 bg-primary text-white rounded-md flex items-center gap-2"
        >
          {updateLoading && <Icon icon="gg:spinner" className="animate-spin" />}
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
