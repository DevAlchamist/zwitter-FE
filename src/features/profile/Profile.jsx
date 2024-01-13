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
  fetchPostByIdAsync,
  fetchUserAllPostsAsync,
  selectPostDetails,
  selectUserPosts,
  updatePostAsync,
} from "../post/postSlice";
import { formatDate } from "../common/dateFormat";
import { selectLoggedInUser } from "../auth/authSlice";
import banner from "../../images/banner.jpg";
import pfp from "../../images/pfp-avatar.png";
import Loader from "../loader/Loader";
import { useForm } from "react-hook-form";
import axios from "axios";

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

  const [liked, setLiked] = useState({});

  useEffect(() => {
    if (userPosts && params.id) {
      const userLiked = { ...liked };

      userPosts.forEach((post) => {
        const userHasLiked = post.likedIds && post.likedIds.includes(params.id);
        userLiked[post._id] = userHasLiked;
      });

      setLiked(userLiked);
    }
  }, [userPosts, params.id]);

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

  const handleLike = (postId, userId) => {
    try {
      const updatedLiked = { ...liked }; // Create a copy of the liked object

      // Toggle liked status for the specific post
      updatedLiked[postId] = !updatedLiked[postId] || false;

      setLiked(updatedLiked); // Update liked state

      // console.log(liked)
      dispatch(
        updatePostAsync({
          id: postId,
          liked: updatedLiked[postId],
          userId: userId,
          profileUserPosts: true,
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
    formData.append("cover", data.cover[0]); // Assuming only one file is selected
    formData.append("userId", userDetail.id);

    dispatch(updateUserAsync(formData));

    closeModal();
  };
  return (
    <>
      {profileStatus === "loading" ? (
        <Loader />
      ) : (
        userDetail && (
          <div className=" w-full ">
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
                    <div className="mb-6 pt-2">
                      <label className="mb-5 block text-md font-semibold text-[#07074D]">
                        Upload banner
                      </label>
                      <div className="mb-8">
                        <input
                          type="file"
                          name="coverImage"
                          {...register("coverImage")}
                          id="banner"
                          className="sr-only"
                        />
                        <label
                          htmlFor="coverImage"
                          className="relative flex min-h-[50px] items-center justify-center rounded-md border-2 border-dashed border-[#e0e0e0] p-5 text-center"
                        >
                          <div>
                            <span className="mb-2 block text-md font-semibold text-[#07074D]">
                              Drop files here Or Browse
                            </span>
                          </div>
                        </label>
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
                  className="w-full  bg-cover bg-no-repeat bg-center"
                  style={{
                    height: 200,
                    backgroundImage: `url(${banner})`,
                  }}
                >
                  {userDetail.id === loggedUser.id ? (
                    <img
                      className="opacity-0 w-full h-full"
                      onClick={openModal}
                      src={banner}
                      alt=""
                    />
                  ) : (
                    <img
                      className="opacity-0 w-full h-full"
                      src={banner}
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
                              className="md rounded-full relative border-4 border-gray-900"
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
                              className="md rounded-full relative border-4 border-gray-900"
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
                <hr className="border-gray-800" />
                <ul className="list-none ">
                  {userPosts &&
                    userPosts.map((post) => (
                      <li key={post._id}>
                        {/*second tweet*/}
                        <article className=" transition duration-350 ease-in-out">
                          <div className="flex flex-shrink-0 p-4 pb-0">
                            <Link
                              to={`/posts/${post._id}`}
                              className="flex-shrink-0 group block"
                            >
                              <div className="flex items-center">
                                <div>
                                  <img
                                    className="inline-block h-10 w-10 rounded-full"
                                    src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png"
                                    alt=""
                                  />
                                </div>
                                <div className="ml-3">
                                  <p className="text-base leading-6 font-medium ">
                                    {userDetail.name}
                                    <span className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                                      {userDetail.username}
                                    </span>
                                  </p>
                                  <span className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                                    posted at - {formatDate(post.createdAt)}
                                  </span>
                                </div>
                              </div>
                            </Link>
                          </div>
                          <div className="pl-16">
                            <p className="text-base width-auto font-medium  flex-shrink">
                              {post.content}
                            </p>
                            <Link
                              to={`/posts/${post._id}`}
                              className="md:flex-shrink pr-6 pt-3"
                            >
                              <div
                                className="bg-cover bg-no-repeat bg-center rounded-lg w-full h-64"
                                style={{
                                  height: 200,
                                  backgroundImage:
                                    "url(https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=448&q=80)",
                                }}
                              >
                                <img
                                  className="opacity-0 w-full h-full"
                                  src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=448&q=80"
                                  alt=""
                                />
                              </div>
                            </Link>
                            <div className="flex mx-3 items-center py-4">
                              <div className="flex-1 flex items-center  text-xs  hover:text-red-600 transition duration-350 ease-in-out">
                                {/* like */}
                                {liked[post._id] ? (
                                  <svg
                                    onClick={() =>
                                      handleLike(post._id, params.id)
                                    }
                                    className="w-5  h-5 mr-2"
                                    viewBox="0 0 24 24"
                                    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                                    xmlns="http://www.w3.org/2000/svg"
                                    version="1.1"
                                    xmlns:cc="http://creativecommons.org/ns#"
                                    xmlns:dc="http://purl.org/dc/elements/1.1/"
                                  >
                                    <g transform="translate(0 -1028.4)">
                                      <path
                                        d="m7 1031.4c-1.5355 0-3.0784 0.5-4.25 1.7-2.3431 2.4-2.2788 6.1 0 8.5l9.25 9.8 9.25-9.8c2.279-2.4 2.343-6.1 0-8.5-2.343-2.3-6.157-2.3-8.5 0l-0.75 0.8-0.75-0.8c-1.172-1.2-2.7145-1.7-4.25-1.7z"
                                        fill="#e74c3c"
                                      />
                                    </g>
                                  </svg>
                                ) : (
                                  <svg
                                    onClick={() =>
                                      handleLike(post._id, params.id)
                                    }
                                    className="w-5  h-5 mr-2"
                                    fill="#000000"
                                    viewBox="0 0 36 36"
                                    version="1.1"
                                    preserveAspectRatio="xMidYMid meet"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink"
                                  >
                                    <title>heart-line</title>
                                    <path
                                      d="M18,32.43a1,1,0,0,1-.61-.21C11.83,27.9,8,24.18,5.32,20.51,1.9,15.82,1.12,11.49,3,7.64c1.34-2.75,5.19-5,9.69-3.69A9.87,9.87,0,0,1,18,7.72a9.87,9.87,0,0,1,5.31-3.77c4.49-1.29,8.35.94,9.69,3.69,1.88,3.85,1.1,8.18-2.32,12.87C28,24.18,24.17,27.9,18.61,32.22A1,1,0,0,1,18,32.43ZM10.13,5.58A5.9,5.9,0,0,0,4.8,8.51c-1.55,3.18-.85,6.72,2.14,10.81A57.13,57.13,0,0,0,18,30.16,57.13,57.13,0,0,0,29.06,19.33c3-4.1,3.69-7.64,2.14-10.81-1-2-4-3.59-7.34-2.65a8,8,0,0,0-4.94,4.2,1,1,0,0,1-1.85,0,7.93,7.93,0,0,0-4.94-4.2A7.31,7.31,0,0,0,10.13,5.58Z"
                                      class="clr-i-outline clr-i-outline-path-1"
                                    ></path>
                                    <rect
                                      x="0"
                                      y="0"
                                      width="36"
                                      height="36"
                                      fill-opacity="0"
                                    />
                                  </svg>
                                )}
                                {post.likedIds.length}
                              </div>
                              <div className="flex-1 flex items-center text-xs hover:text-blue-400 transition duration-350 ease-in-out">
                                <svg
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="w-5 h-5 mr-2"
                                >
                                  <g>
                                    <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z" />
                                  </g>
                                </svg>
                                {post.comments.length}
                              </div>
                              <div className="flex-1 flex items-center  text-xs  hover:text-green-400 transition duration-350 ease-in-out">
                                <svg
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="w-5 h-5 mr-2"
                                >
                                  <g>
                                    <path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z" />
                                  </g>
                                </svg>
                                14 k
                              </div>
                              <div className="flex-1 flex items-center  text-xs  hover:text-blue-400 transition duration-350 ease-in-out">
                                <svg
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="w-5 h-5 mr-2"
                                >
                                  <g>
                                    <path d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z" />
                                    <path d="M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z" />
                                  </g>
                                </svg>
                              </div>
                            </div>
                          </div>
                          <hr className="border-gray-800" />
                        </article>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Profile;
