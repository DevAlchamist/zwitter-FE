import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createPostAsync,
  fetchAllPostAsync,
  selectAllPosts,
  selectPostStatus,
  updatePostAsync,
} from "../postSlice";
import { formatDate } from "../../common/dateFormat";
import { selectLoggedInUser } from "../../auth/authSlice";
import pfp from "../../../images/pfp-avatar.png";

import { Link } from "react-router-dom";
import Loader from "../../loader/Loader";

const Posts = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const user = useSelector(selectLoggedInUser);

  const allPosts = useSelector(selectAllPosts);

  const postStatus = useSelector(selectPostStatus);

  const [liked, setLiked] = useState({});

  useEffect(() => {
    if (allPosts && user) {
      const userLiked = { ...liked };

      allPosts.forEach((post) => {
        const userHasLiked = post.likedIds && post.likedIds.includes(user.id);
        userLiked[post._id] = userHasLiked;
      });

      setLiked(userLiked);
    }
  }, [allPosts, user]);

  const handleLike = (postId, user) => {
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
          userId: user.id,
        })
      );
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  useEffect(() => {
    dispatch(fetchAllPostAsync());
  }, [dispatch]);

  return (
    <>
      {postStatus === "loading" ? (
        <Loader />
      ) : (
        <div className=" w-full overflow-y-auto h-screen scroll no-scrollbar">
          <div>
            {/* Create Post */}
            <div>
              <div className="max-w-2xl mb-5 mx-auto">
                <form
                  encType="multipart/form-data"
                  onSubmit={handleSubmit((data) => {
                    const formData = new FormData();
                    formData.append("id", user.id);
                    formData.append("content", data.content);
                    formData.append("postImage", data.postImage[0]);
                    dispatch(createPostAsync(formData));
                  })}
                >
                  <div className="mb-4 w-full px-5 pb">
                    <div className="flex justify-between items-center py-2 px-3 border-b dark:border-gray-600">
                      <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x dark:divide-gray-600">
                        <div className="flex items-center space-x-1 sm:pr-4">
                          <button
                            type="button"
                            className="p-2  rounded cursor-pointer text-gray-400 hover:text-white hover:bg-blue-500"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <input
                              {...register("postImage")}
                              type="file"
                              name="postImage"
                              id="postImage"
                              className=" w-5 h-5 absolute opacity-0  top-4 flex "
                            />
                          </button>
                          <button
                            type="button"
                            className="p-2  rounded cursor-pointer text-gray-400 hover:text-white hover:bg-blue-500"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="py-2 px-4 bg-white border-b border-gray-600">
                      <label htmlFor="post" className="sr-only">
                        Post
                      </label>
                      <textarea
                        {...register("content", {
                          required: "Content is Required",
                        })}
                        id="content"
                        rows={3}
                        className="block px-0 w-full outline-none text-sm text-pretty text-gray-800 bg border-0"
                        placeholder="Write an article..."
                        required
                        defaultValue={""}
                      />
                      {errors.content && (
                        <p className="text-red-500 bottom-3 relative text-center">
                          {errors.content.message}
                        </p>
                      )}
                      {/* {error && (
                      <p className="text-red-500 text-center">
                        {error || error.message}
                      </p>
                    )} */}
                    </div>
                    <button
                      type="submit"
                      className="mt-5 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                    >
                      Post
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* component */}
            {/* This is an example component */}
            {!!allPosts
              ? [...allPosts]
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((post) => (
                    <>
                      <hr key={post._id} className="-border-t-gray-800 " />
                      <ul key={post._id} className="list-none ">
                        <li>
                          {/*second tweet*/}
                          <article className="transition duration-350 ease-in-out">
                            <div className="flex flex-shrink-0 p-4 pb-0">
                              <Link
                                to={`/profile/${post.user.id}`}
                                className="flex-shrink-0 group block"
                              >
                                <div className="flex items-center">
                                  <div>
                                    <img
                                      className="inline-block h-10 w-10 rounded-full"
                                      src={
                                        post.user?.profileImage?.url
                                          ? post.user?.profileImage?.url
                                          : pfp
                                      }
                                      alt=""
                                    />
                                  </div>
                                  <div className="ml-3">
                                    <p className="text-base leading-6 font-medium ">
                                      {post.user.name} {""}
                                      <span className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                                        {post.user.username} . 16 April
                                      </span>
                                    </p>
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
                                className="flex md:flex-shrink pr-6 pt-3"
                              >
                                {post.postImage?.url && (
                                  <div
                                    className="bg-cover bg-no-repeat bg-center rounded-lg w-full h-64"
                                    style={{
                                      height: 200,
                                      backgroundImage: `url(${post.postImage.url})`,
                                    }}
                                  >
                                    <img
                                      className="opacity-0 w-full h-full"
                                      src={post.postImage.url}
                                      alt=""
                                    />
                                  </div>
                                )}
                              </Link>
                              <div className="flex items-center py-4">
                                <div className="flex-1 flex items-center  text-xs  hover:text-red-600 transition duration-350 ease-in-out">
                                  {/* like */}

                                  {liked[post._id] ? (
                                    <svg
                                      onClick={() => handleLike(post._id, user)}
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
                                      onClick={() => handleLike(post._id, user)}
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
                                <Link
                                  to={`/posts/${post._id}`}
                                  className="flex-1 flex items-center text-xs hover:text-blue-400 transition duration-350 ease-in-out"
                                >
                                  {/* comments */}
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
                                </Link>
                                <div className="flex-1 flex items-center  text-xs  hover:text-green-400 transition duration-350 ease-in-out">
                                  {/* retweet */}
                                  <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-5 h-5 mr-2"
                                  >
                                    <g>
                                      <path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z" />
                                    </g>
                                  </svg>
                                  14
                                </div>

                                <div className="flex-1 flex items-center  text-xs  hover:text-blue-400 transition duration-350 ease-in-out">
                                  {/* share */}
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
                      </ul>
                    </>
                  ))
              : null}
            <div className="flex border-t-2 border-gray-400 justify-center  min-h-auto">
              {" "}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Posts;
