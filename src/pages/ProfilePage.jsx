import React from "react";
import Navbar from "../features/navbar/Navbar";
import Profile from "../features/profile/Profile";
import Users from "../features/user/Users";
import LayoutPage from "./LayoutPage";

const ProfilePage = () => {
  return (
    <>
      <LayoutPage>
        <Profile />
      </LayoutPage>
    </>
  );
};

export default ProfilePage;
