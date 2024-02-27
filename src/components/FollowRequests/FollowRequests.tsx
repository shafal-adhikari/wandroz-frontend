import { Icon } from "@iconify/react";
import {
  Dropdown,
  DropdownButton,
  DropdownContent,
} from "../shared/Dropdown/Dropdown";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  acceptFollowRequest,
  getFollowRequests,
} from "../../store/user/user-actions";
import { Link } from "react-router-dom";

function FollowRequests() {
  const dispatch: AppDispatch = useDispatch();
  const { followRequests, followRequestsLoading, acceptLoadings } = useSelector(
    (state: RootState) => state.user
  );
  useEffect(() => {
    dispatch(getFollowRequests());
  }, [dispatch]);

  const confirmRequestHandler = (status: boolean, followerId: string) => {
    dispatch(acceptFollowRequest({ status, followerId }));
  };
  return (
    <Dropdown>
      <DropdownButton className="flex items-center justify-center rounded-full text-primary w-12 h-12 bg-gray-200 hover:bg-primary hover:text-white cursor-pointer transition-all duration-200 ease-in-out relative">
        <Icon icon="heroicons:users-solid" className="text-2xl" />
        {followRequests.length > 0 && (
          <div className="absolute -top-1 right-1 bg-red-500 w-4 h-4 rounded-full"></div>
        )}
      </DropdownButton>
      <DropdownContent className="absolute top-[5rem] right-5 mr-10 min-w-[20rem] h-auto rounded-md bg-white flex flex-col gap-3 py-3 px-3 shadow-md">
        <div className="flex px-3 gap-2 items-center">
          <div className="text-xl text-slate-900 font-[500]">
            Follow Requests
          </div>
          <div className=" flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white">
            {followRequests?.length}
          </div>
        </div>

        {followRequestsLoading && (
          <div className="flex items-center w-full">
            <Icon icon="gg:spinner" className="animate:spin" />
          </div>
        )}
        {followRequests?.length ? (
          followRequests.map((request, i) => {
            const loadingStatus = acceptLoadings.includes(request._id);
            return (
              <div
                key={i}
                className="flex gap-3 px-3 py-2 hover:bg-slate-100 items-center"
              >
                <Link to={`/profile/${request._id}`}>
                  <img
                    className="cursor-pointer w-16 h-16 rounded-full"
                    src={
                      request.profilePicture.length
                        ? request.profilePicture
                        : "/default-avatar.webp"
                    }
                  />
                </Link>
                <div className="flex flex-col gap-2">
                  <div className="text-slate-800 text-xl font-[500]">
                    {request.firstName} {request.lastName}
                  </div>
                  <div className="flex gap-2">
                    {!loadingStatus ? (
                      request.status == "PENDING" || !request.status ? (
                        <>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              confirmRequestHandler(true, request._id);
                            }}
                            className="px-5 py-1 bg-primary hover:bg-primaryHover text-white text-lg rounded-md"
                          >
                            Accept
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              confirmRequestHandler(false, request._id);
                            }}
                            className="px-5 py-1 bg-slate-300  text-slate-700 text-lg rounded-md"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          {request.status == "NOT_FOLLOWED" ? (
                            <span className="text-md text-slate-800">
                              Request Canceled
                            </span>
                          ) : (
                            <span className="text-md text-slate-800">
                              Request Accepted
                            </span>
                          )}
                        </>
                      )
                    ) : (
                      <Icon
                        icon="gg:spinner"
                        className="animate-spin text-3xl my-3 self-center"
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-center text-slate-600 text-md">
            No Follow Requests Found
          </div>
        )}
      </DropdownContent>
    </Dropdown>
  );
}

export default FollowRequests;
