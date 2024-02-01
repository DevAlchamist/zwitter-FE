import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUserAsync,
  selectAllUsers,
  updateUserAsync,
} from "./userSlice";
import { Link } from "react-router-dom";
import { selectLoggedInUser } from "../auth/authSlice";
import pfp from "../../images/pfp-avatar.png";
import { Box, Card, CardHeader, Input } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Users = () => {
  const dispatch = useDispatch();

  const allUsers = useSelector(selectAllUsers);

  const loggedUser = useSelector(selectLoggedInUser);

  const [username, setUsername] = useState({});

  useEffect(() => {
    dispatch(fetchAllUserAsync({ username }));
  }, [dispatch, username]);

  return (
    <div>
      <>
        <div className=" h-screen font-jakarta-sans w-full border-l-2 border-[#F0F0F0] py-3 px-5 ">
          <Box className="flex flex-row  rounded-lg border-2 border-[#F0F0F0] border-solid   ">
            <Input
              disableUnderline={true}
              onChange={(e) => setUsername(e.target.value)}
              className=" px-4 border-none outline-none"
              placeholder="Search for documents"
              inputProps={{ "aria-label": "search" }}
            />
            <SearchIcon className=" text-[#A3A3A3] text-2xl py-2 h-full  pointer-events-none  flex items-center justify-center" />
          </Box>
          <div className="flex flex-col gap-3 py-6">
            {allUsers &&
              allUsers.map(
                (user) =>
                  user.id !== loggedUser.id && (
                    <>
                      <Link key={user.id} className=" w-full flex" to={`/profile/${user.id}`}>
                        <Card className="w-full bg-[#F7F9FB]  rounded-lg" elevation={0}>
                          <CardHeader
                            className=" "
                            avatar={
                              <img
                                className="h-9 w-9 object-cover rounded-full"
                                src={
                                  user?.profileImage?.url
                                    ? user?.profileImage?.url
                                    : pfp
                                }
                                alt={user.name}
                              />
                            }
                            title={
                              <span className=" font-jakarta-sans font-semibold  text-[#616161]">
                                {user.name}
                              </span>
                            }
                            subheader={
                              <span className=" font-jakarta-sans font-normal text-[#BDBDBD]">
                                {user.username}
                              </span>
                            }
                          />
                        </Card>
                      </Link>
                    </>
                  )
              )}
          </div>
        </div>
      </>
    </div>
  );
};

export default Users;
