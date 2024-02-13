import React, { useState } from "react";
import logo from "../../images/zwitter-horizontal.png";
import headerLogo from "../../images/zwitter-horizontal.png";

import { useDispatch, useSelector } from "react-redux";
import { logoutUserAsync, selectLoggedInUser } from "../auth/authSlice";
import Users from "../user/Users";
import pfp from "../../images/pfp-avatar.png";
import { Link, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Menu, MenuItem, Tooltip } from "@mui/material";

const Navbar = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectLoggedInUser);

  const navs = [
    {
      title: "Home",
      link: "/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      ),
    },
    {
      title: "My Profile",
      link: `/profile/${user.id}`,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className="h-5 w-5"
        >
          <path
            fillRule="evenodd"
            d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      title: "Notification",
      link: "/notification",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
          />
        </svg>
      ),
    },
    {
      // onClick={() => dispatch(logoutUserAsync())} function yet to be added
      title: "Logout",
      onClick: () => dispatch(logoutUserAsync()),
      link: "/login",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className="h-5 w-5"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      <div>
        <SideBar navs={navs} />
      </div>
      <div>
        <Header navs={navs} user={user} dispatch={dispatch} />
      </div>
    </>
  );
};

const SideBar = ({ navs }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const pathnameSegments =
    pathname === "/" ? [""] : pathname.split("/").filter(Boolean); 
  console.log(pathnameSegments);
  return (
    <div className="hidden w-[20%] md:inline lg:inline xl:inline">
      <div className=" no-scrollbar px-4 font-jakarta-sans w-[100%] border-r-2 border-[#F0F0F0] shadow-xl  bg-white hidden md:flex md:flex-col h-screen items-center justify-center overflow-y-auto ">
        <div className=" z-50 pt-8 pb-8 h-full w-[100%] rounded-[12px] flex flex-col items-center gap-3">
          <img src={logo} alt="zwitter_logo" className="my-4 w-48 " />
          {navs.map((nav) => {
            return (
              <Link
                key={nav.link}
                className={`  w-full text-center items-center hover:bg-[#FFE3C9] gap-2 hover:text-[#F68319] flex rounded-[8px] px-5 py-2 text-sm 2xl:text-[18px] font-normal ${
                  pathnameSegments[0] === nav.link.split("/")[1]
                    ? "bg-[#FFE3C9] ml-5 text-[#F68319]"
                    : "text-[#616161] mr-5 "
                }`}
                to={nav.link}
                onClick={nav.onClick}
              >
                {nav.icon}

                <div>
                  <p className="font-jakarta-sans">{nav.title}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Header = ({ user, dispatch }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleLogoutAndCloseMenu = () => {
    dispatch(logoutUserAsync());
    setAnchorElUser(null);
  };

  const handleCloseMenu = () => {
    setAnchorElUser(null);
  };

  const settings = [
    { title: "Profile", url: `/profile/${user.id}` },
    { title: "Notification", url: `/profile/}` },
    {
      title: "Logout",
      onClick: handleLogoutAndCloseMenu,
      url: `/login`,
    },
  ];

  return (
    <Box
      className=" font-jakarta-sans md:hidden lg:hidden xl:hidden "
      sx={{ flexGrow: 1 }}
    >
      <AppBar className=" bg-white" position="static">
        <Toolbar className="border-b-2 border-[#F0F0F0] flex justify-between">
          <IconButton
            size="large"
            edge="start"
            color="black"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <SearchIcon />
          </IconButton>
          <Box className="flex">
            <Link to={"/"}>
              <img
                src={headerLogo}
                alt="zwitter_logo"
                className=" h-full w-36"
              />
            </Link>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip>
              <IconButton onClick={handleOpenUserMenu} color="inherit">
                {" "}
                <Avatar
                  className="h-9 w-9 bg-[#F7F9FB] object-cover rounded-full"
                  src={user?.profileImage?.url ? user?.profileImage?.url : ""}
                  alt={user.name}
                />
              </IconButton>
              <Menu
                className=" z-50"
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseMenu}
              >
                {settings.map((setting, index) => (
                  <Link to={setting.url} key={index}>
                    <MenuItem onClick={setting.onClick}>
                      <Typography textAlign="center">
                        {setting.title}
                      </Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
