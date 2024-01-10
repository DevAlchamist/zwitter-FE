import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUserAsync, selectAllUsers } from "./userSlice";

const Users = () => {
  const dispatch = useDispatch();

  const allUsers = useSelector(selectAllUsers);
  // const allUsers = [
  //   {
  //     name: "All Users",
  //     username: "All Users",
  //   },
  // ];

  const [username, setUsername] = useState({});

  // const handleSearchUser = (e) => {
  //   dispatch(fetchAllUserAsync(e.target.value))
  // };

  useEffect(() => {
    dispatch(fetchAllUserAsync({username} ));
  }, [dispatch, username]);

  return (
    <div>
      <>
        {/* component */}
        {/* This is an example component */}
        <div className="">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="p-4">
              <label htmlFor="table-search" className="sr-only">
                Search
              </label>
              <div className="relative mt-1">
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  id="table-search"
                  className=" text-sm border-b-2 pb-2 outline-none border-gray-600 block w-80 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 text-black"
                  placeholder="Search..."
                />
              </div>
            </div>
          </div>
            {allUsers &&
              allUsers.map((user) => (
                <div className="w-full flex p-3 pl-4 items-center hover:bg-gray-300 rounded-lg cursor-pointer">
                  <div className="mr-4">
                    <div className="h-9 w-9 rounded-sm flex items-center justify-center text-3xl">
                      <div className="border-2 border-gray-400 w-full rounded-full h-full">
                        {" "}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between w-full h-auto">
                    <div className="w-[40%]">
                      <div className="font-bold text-lg">{user.name}</div>
                      <div className="text-xs text-gray-500">
                        <span className="mr-2">{user.username}</span>
                      </div>
                    </div>
                    <button className="border-1 mt-3 justify-center text-center border-black w-[30%] p-auto rounded-[10%] h-[90%] bg-blue-500 hover:bg-blue-600">
                      Follow
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </>
    </div>
  );
};

export default Users;
