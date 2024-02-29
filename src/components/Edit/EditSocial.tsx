import { useEffect, useState } from "react";
import Input from "../shared/ui/Input";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getProfile, updateSocialLinks } from "../../store/user/user-actions";

export function EditSocial({ closeModal }: { closeModal: () => void }) {
  const { user, updateLoading } = useSelector((state: RootState) => state.user);
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    instagram: "",
    youtube: "",
    twitter: "",
  });
  const dispatch: AppDispatch = useDispatch();
  const saveSocialLinkHandler = async () => {
    await dispatch(updateSocialLinks(socialLinks))
      .unwrap()
      .then(() => {
        closeModal();
        dispatch(getProfile());
      });
  };
  useEffect(() => {
    if (user) {
      setSocialLinks({
        facebook: user.social.facebook,
        instagram: user.social.instagram,
        youtube: user.social.youtube,
        twitter: user.social.twitter,
      });
    }
  }, [user]);
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSocialLinks((prev) => {
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
        name="instagram"
        value={socialLinks.instagram}
        className="w-[full] px-4 py-0 h-12 rounded-md relative"
        type="text"
        inputClassName="text-md text-slate-600"
        placeholder="Instagram"
        label="Instagram"
      />
      <Input
        onChange={onChangeHandler}
        name="facebook"
        value={socialLinks.facebook}
        className="w-[full] px-4 py-0 h-12 rounded-md relative"
        type="text"
        inputClassName="text-md text-slate-600"
        placeholder="Facebook"
        label="Facebook"
      />
      <Input
        onChange={onChangeHandler}
        name="twitter"
        value={socialLinks.twitter}
        className="w-[full] px-4 py-0 h-12 rounded-md relative"
        type="text"
        inputClassName="text-md text-slate-600"
        placeholder="Twitter"
        label="Twitter"
      />
      <Input
        onChange={onChangeHandler}
        name="youtube"
        value={socialLinks.youtube}
        className="w-[full] px-4 py-0 h-12 rounded-md relative"
        type="text"
        inputClassName="text-md text-slate-600"
        placeholder="Youtube"
        label="Youtube"
      />
      <div className="w-full flex justify-end gap-2">
        <button
          onClick={saveSocialLinkHandler}
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
