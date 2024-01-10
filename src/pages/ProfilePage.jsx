import React from "react";
import Navbar from "../features/navbar/Navbar";
import Profile from "../features/profile/Profile";

const ProfilePage = () => {
  return (
    <div>
      <Navbar>
        <Profile />
      </Navbar>
    </div>
  );
};

export default ProfilePage;
