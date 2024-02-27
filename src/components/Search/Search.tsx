import { Icon } from "@iconify/react";
import Input from "../shared/ui/Input";
import { ChangeEvent, useEffect, useState } from "react";
import debounce from "debounce";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { searchUsers } from "../../store/user/user-actions";
import { Link } from "react-router-dom";
import { Dropdown, DropdownContent } from "../shared/Dropdown/Dropdown";
function Search() {
  // const [showDropdown, setShowDropdown] = useState(false);
  const [searchText, setSearchText] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.user);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const [isTyping, setIsTyping] = useState(false);
  useEffect(() => {
    setIsTyping(true);
    if (searchText.trim() !== "") {
      const delayedSearch = debounce(() => {
        dispatch(searchUsers(searchText));
        setIsTyping(false);
      }, 600);

      delayedSearch();

      return () => {
        delayedSearch.clear();
      };
    }
  }, [searchText, dispatch]);
  return (
    <Dropdown open={searchText.length > 0}>
      <Input
        onChange={onChangeHandler}
        value={searchText}
        className="w-[30rem] px-4 py-0 h-12 rounded-full relative"
        type="text"
        icon={<Icon icon="bx:bx-search" className="text-xl text-slate-600" />}
        inputClassName="text-md text-slate-600"
        placeholder="Search..."
      />

      <DropdownContent className="w-[30rem] absolute top-[5rem] bg-white rounded-md flex flex-col shadow-md">
        <div className="text-slate-600 text-md flex gap-2 p-4 items-center">
          Search results for {searchText}
          {userState.searchLoading && (
            <Icon icon="gg:spinner" className="text-xl animate-spin" />
          )}
        </div>
        <div className=" text-slate-600 text-md flex flex-col items-center">
          {!isTyping &&
            userState.searchUsers.length < 1 &&
            !userState.searchLoading && (
              <span className="px-4 py-2 text-md font-semibold">
                No Results Found
              </span>
            )}
          {!isTyping &&
            !userState.searchLoading &&
            userState.searchUsers.map((user, index) => {
              return (
                <Link
                  to={`/profile/${user._id}`}
                  className="cursor-pointer flex gap-5 w-full px-4 py-2 text-md items-center font-semibold hover:bg-slate-100 rounded-md"
                  key={index}
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    src={
                      user.profilePicture.length
                        ? user.profilePicture
                        : "/default-avatar.webp"
                    }
                    alt={user.firstName}
                  />
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                </Link>
              );
            })}
        </div>
      </DropdownContent>
    </Dropdown>
  );
}

export default Search;
