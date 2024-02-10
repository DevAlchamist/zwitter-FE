import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { FaPlus } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import {
  fetchUserByIdAsync,
  selectAllUsers,
  selectUserDetails,
  selectUserProfileStatus,
  updateUserAsync,
} from "../user/userSlice";
import {
  fetchUserAllPostsAsync,
  selectUserPosts,
} from "../post/postSlice";
import { formatDate } from "../common/dateFormat";
import { selectLoggedInUser } from "../auth/authSlice";
import banner from "../../images/banner.jpg";
import pfp from "../../images/pfp-avatar.png";
import Loader from "../loader/Loader";
import { useForm } from "react-hook-form";
import PostCard from "../common/Post";

const Profile = () => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm();
  const params = useParams();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const dispatch = useDispatch();
  const userDetail = useSelector(selectUserDetails);
  const userPosts = useSelector(selectUserPosts);
  const allUsers = useSelector(selectAllUsers);
  const loggedUser = useSelector(selectLoggedInUser);
  const profileStatus = useSelector(selectUserProfileStatus);

  const [follow, setFollow] = useState({});

  useEffect(() => {
    if (allUsers && loggedUser) {
      const userFollowed = { ...follow };

      allUsers.forEach((user) => {
        const userHasFollowed =
          user.followersIds && user.followersIds.includes(loggedUser.id);
        userFollowed[user.id] = userHasFollowed;
      });

      setFollow(userFollowed);
    }
  }, [allUsers, loggedUser]);

  const handleFollow = (followingId, userId) => {
    try {
      const userFollowed = { ...follow }; // Create a copy of the liked object

      // Toggle liked status for the specific post
      userFollowed[followingId] = !userFollowed[followingId] || false;

      setFollow(userFollowed); // Update liked state

      dispatch(
        updateUserAsync({
          userId: userId,
          followed: userFollowed[followingId],
          followingUserId: followingId,
        })
      );
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  useEffect(() => {
    dispatch(fetchUserByIdAsync(params.id));
    dispatch(fetchUserAllPostsAsync(params.id));
  }, [dispatch, params.id]);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    // formData.append("profileImage", data.profileImage[0]); // Assuming only one file is selected
    formData.append("profileImage", data.profileImage[0]); // Assuming only one file is selected
    formData.append("coverImage", data.coverImage[0]); // Assuming only one file is selected
    formData.append("userId", userDetail.id);
    formData.append("bio", data.bio);

    dispatch(updateUserAsync(formData));

    closeModal();
  };
  return (
    <>
      {profileStatus === "loading" ? (
        <Loader />
      ) : (
        userDetail && (
          <div className=" w-full font-jakarta-sans ">
            {/* Modal */}
            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              {/* component */}
              <div className="flex items-center justify-center px-5">
                {/* Author: FormBold Team */}
                {/* Learn More: https://formbold.com */}
                <div className="mx-auto w-full max-w-auto bg-white">
                  <form
                    className="py-2 px-9"
                    action="submit"
                    encType="multipart/form-data"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    {/* PFP */}
                    <div className="mb-6">
                      <label className="mb-5 block text-md font-semibold text-[#07074D]">
                        Upload PFP
                      </label>
                      <div className="flex items-center mb-2">
                        <input
                          type="file"
                          {...register("profileImage")}
                          name="profileImage"
                          id="profileImage"
                          className="sr-only"
                        />
                        <label
                          htmlFor="profileImage"
                          className="relative flex min-h-[100px] items-center justify-center rounded-full border-2 border-dashed border-[#e0e0e0] mr-5 text-center w-[100px]"
                        >
                          <FaPlus />
                        </label>
                        <span className="mb-2 block text-md font-semibold text-[#07074D]">
                          Drop files here Or Browse
                        </span>
                      </div>
                    </div>
                    {/* Banner */}
                    <div className="mb-6">
                      <label className="mb-5 block text-md font-semibold text-[#07074D]">
                        Upload banner
                      </label>
                      <div className="flex items-center mb-2">
                        <input
                          type="file"
                          {...register("coverImage")}
                          name="coverImage"
                          id="coverImage"
                          className="sr-only"
                        />
                        <label
                          htmlFor="coverImage"
                          className="relative flex min-h-[100px] items-center justify-center rounded- border-2 border-dashed border-[#e0e0e0] mr-5 text-center w-full"
                        >
                          <FaPlus />
                        </label>
                        <span className="mb-2 block text-md font-semibold text-[#07074D]">
                          Drop files here Or Browse
                        </span>
                      </div>
                    </div>
                    {/* update Name */}
                    {/* <div class="flex mb-5">
                      <input
                        type="text"
                        name="name"
                        {...register("name")}
                        id="name"
                        placeholder="Update your name"
                        class="w-full rounded-md mr-5 border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:shadow-xl"
                      />
                      <input
                        type="text"
                        {...register("username")}
                        name="username"
                        id="username"
                        placeholder="Update your username"
                        class="w-full rounded-md ml-5 border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:shadow-xl"
                      />
                    </div> */}
                    <div class="mb-5">
                      <input
                        type="text"
                        {...register("bio")}
                        name="bio"
                        id="bio"
                        placeholder="Update your Bio"
                        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:shadow-xl"
                      />
                    </div>
                    <div className="flex justify-between">
                      <button
                        onClick={closeModal}
                        className="hover:shadow-form w-auto rounded-md  py-2 px-8 text-center text-base font-semibold border border-gray-400 outline-none"
                      >
                        cancel
                      </button>
                      <button
                        type="submit"
                        className="hover:shadow-form w-auto rounded-md bg-[#6A64F1] py-2 px-8 text-center text-base font-semibol  outline-none"
                      >
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </Modal>
            {/* Main Profile */}
            <div className="">
              <div className="">
                <div className=" flex justify-start">
                  <div className=" px-4 py-2 mx-2">
                    <a className=" text-2xl font-medium rounded-full hover:bg-gray-800 hover:text-white float-right">
                      <svg
                        className="m-2 h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <g>
                          <path d="M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z"></path>
                        </g>
                      </svg>
                    </a>
                  </div>
                  <div className="mx-2">
                    <h2 className="mb-0 text-xl font-bold ">
                      {userDetail.name}
                    </h2>
                    <span className="text-gray-600">
                      {" "}
                      Joined at {formatDate(userDetail.createdAt)}{" "}
                    </span>{" "}
                    <span className="font-semibold ">
                      {/* {formatDate(userDetail.createdAt)}{" "} */}
                    </span>
                  </div>
                </div>
                <hr className="border-gray-800" />
              </div>
              {/* User card*/}
              <div className="  bottom-0 h-[589px] overflow-y-auto no-scrollbar ">
                <div
                  className="w-full   bg-cover bg-no-repeat bg-center"
                  style={{
                    height: 200,
                    backgroundImage: `url(${
                      userDetail.coverImage?.url
                        ? userDetail.coverImage?.url
                        : banner
                    })`,
                  }}
                >
                  {userDetail.id === loggedUser.id ? (
                    <img
                      className=" h-full opacity-0 w-full"
                      onClick={openModal}
                      src={
                        userDetail.coverImage?.url
                          ? userDetail.coverImage?.url
                          : banner
                      }
                      alt=""
                    />
                  ) : (
                    <img
                      className="opacity-0 w-full h-full"
                      src={
                        userDetail.coverImage?.url
                          ? userDetail.coverImage?.url
                          : banner
                      }
                      alt=""
                    />
                  )}
                </div>
                <div className="p-4">
                  <div className="relative flex w-full">
                    {/* Avatar */}
                    <div className="flex flex-1">
                      <div style={{ marginTop: "-6rem" }}>
                        <div
                          style={{ height: "9rem", width: "9rem" }}
                          className="md rounded-full relative avatar"
                        >
                          {userDetail.id === loggedUser.id ? (
                            <img
                              onClick={openModal}
                              style={{ height: "9rem", width: "9rem" }}
                              className="md rounded-full relative border-4  bg-white border-gray-900"
                              src={
                                userDetail.profileImage?.url
                                  ? userDetail.profileImage?.url
                                  : pfp
                              }
                              alt="profile"
                            />
                          ) : (
                            <img
                              style={{ height: "9rem", width: "9rem" }}
                              className="md rounded-full relative border-4 bg-white border-gray-900"
                              src={
                                userDetail.profileImage?.url
                                  ? userDetail.profileImage?.url
                                  : pfp
                              }
                              alt=""
                            />
                          )}
                          <span className="hidden-button absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100 focus:outline-none">
                            <MdModeEdit className="h-[25px] w-[25px]" />
                          </span>
                          <div className="absolute" />
                        </div>
                      </div>
                    </div>
                    {/* Follow Button & edit Button */}
                    <div className="flex flex-col text-right">
                      {userDetail.id === loggedUser.id ? (
                        <div className="flex flex-col text-right">
                          <button
                            onClick={openModal}
                            className="justify-center whitespace-nowrap focus:outline-none  focus:ring  rounded max-w-max border bg-transparent border-blue-500 text-blue-500 flex items-center hover:shadow-lg font-bold py-2 px-4 mr-0 ml-auto"
                          >
                            Edit Profile
                          </button>
                        </div>
                      ) : follow[userDetail.id] ? (
                        <button className="justify-center whitespace-nowrap focus:outline-none  focus:ring  rounded max-w-max border bg-transparent border-blue-500 text-blue-500 flex items-center hover:shadow-lg font-bold py-2 px-4 mr-0 ml-auto">
                          <div
                            onClick={() => {
                              handleFollow(userDetail.id, loggedUser.id);
                            }}
                          >
                            following
                          </div>
                        </button>
                      ) : (
                        <button className="justify-center whitespace-nowrap focus:outline-none  focus:ring  rounded max-w-max border border-blue-500 text-blue-500 flex items-center hover:shadow-lg font-bold py-2 px-4 mr-0 ml-auto">
                          <div
                            onClick={() => {
                              handleFollow(userDetail.id, loggedUser.id);
                            }}
                          >
                            follow
                          </div>
                        </button>
                      )}
                    </div>
                  </div>
                  {/* Profile info */}
                  <div className="space-y-1 justify-center w-full mt-3 ml-3">
                    {/* User basic*/}
                    <div>
                      <h2 className="text-xl leading-6 font-bold ">
                        {userDetail.name}
                      </h2>
                      <p className="text-sm leading-5 font-medium text-gray-600">
                        {userDetail.username}
                      </p>
                    </div>
                    {/* Description and others */}
                    <div className="mt-3">
                      <p className=" leading-tight mb-2">
                        <div>{userDetail.bio}</div>
                      </p>
                    </div>
                    <div className="pt-3 flex justify-start items-start w-full divide-x divide-gray-800 divide-solid">
                      <div className="text-center pr-3">
                        <span className="font-bold ">
                          {userDetail?.followingIds?.length}
                        </span>
                        <span className="text-gray-600"> Following</span>
                      </div>
                      <div className="text-center pr-3">
                        <span className="font-bold ">
                          {userDetail?.followersIds?.length}
                        </span>
                        <span className="text-gray-600"> Followers</span>
                      </div>
                    </div>
                  </div>
                </div>
                {!!userPosts
                  ? [...userPosts]
                      .sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                      )
                      .map((post) => <PostCard post={post} />)
                  : null}
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Profile;
