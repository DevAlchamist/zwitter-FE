import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createPostAsync,
  fetchAllPostAsync,
  selectAllPosts,
  updatePostAsync,
} from "../postSlice";
import { formatDate } from "../../common/dateFormat";
import { selectLoggedInUser } from "../../auth/authSlice";

import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";

const Posts = () => {
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();

  const user = useSelector(selectLoggedInUser);

  const allPosts = useSelector(selectAllPosts);

  const [liked, setLiked] = useState({});

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
    <div className="overflow-y-auto h-screen scroll no-scrollbar">
      <div>
        {/* Create Post */}
        <div>
          <div className="max-w-2xl mb-5 mx-auto">
            <form
              onSubmit={handleSubmit((data) => {
                console.log(data);
                dispatch(
                  createPostAsync({
                    id: user.id,
                    content: data.content,
                  })
                );
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
                            d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                            clipRule="evenodd"
                          />
                        </svg>
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
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
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
                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                            clipRule="evenodd"
                          />
                        </svg>
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
                            d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
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
                    {...register("content", { required: true })}
                    id="content"
                    rows={3}
                    className="block px-0 w-full outline-none text-sm text-pretty text-gray-800 bg border-0"
                    placeholder="Write an article..."
                    required
                    defaultValue={""}
                  />
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
                <div
                  key={post._id}
                  className="flex border-t-2 border-gray-400 justify-center  min-h-auto"
                >
                  {" "}
                  <>
                    {/* component */}
                    <div className=" flex items-center justify-center h-5/6 overflow-y-auto">
                      <div className="bg-white  p-5 rounded-xl border h-fit">
                        <Link
                          to={`/posts/${post._id}`}
                          className="flex justify-between"
                        >
                          <div className="flex items-center">
                            <img
                              className="h-auto w-auto rounded-full"
                              src="https://pbs.twimg.com/profile_images/1287562748562309122/4RLk5A_U_x96.jpg"
                            />
                            <div className="ml-1.5 text-sm leading-tight">
                              <span className=" font-bold block ">
                                {post.user.name}
                              </span>
                              <span className=" font-normal block">
                                @{post.user.username}
                              </span>
                            </div>
                          </div>
                          <svg
                            className="text-blue-400 h-6 w-auto inline-block fill-current"
                            viewBox="0 0 24 24"
                          >
                            <g>
                              <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
                            </g>
                          </svg>
                        </Link>
                        <div className="ml-10">
                          <p className=" block text-lg leading-snug mt-3">
                            {post.content}
                          </p>
                          <img
                            className="mt-2 rounded-2xl border h-auto  border-gray-100"
                            src="https://pbs.twimg.com/media/EpkuplDXEAEjbFc?format=jpg&name=medium"
                          />
                          <p className="text-base py-1 my-0.5">
                            {formatDate(post.createdAt)}
                          </p>
                          <div className="border-gray-200 dark:border-gray-600 border border-b-0 my-1" />
                          <div className=" flex mt-3">
                            <div className="flex items-center mr-6">
                              {/* <svg
                                className="fill-current  h-5 w-auto"
                                viewBox="0 0 24 24"
                              >
                                <g >
                                  <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z" />
                                </g>
                              </svg> */}
                              <CiHeart
                                onClick={() => handleLike(post._id, user)}
                                className={`fill-current  h-5 w-auto ${
                                  post.likedIds &&
                                  post.likedIds.includes(user.id)
                                    ? "bg-red-500"
                                    : ""
                                }  `}
                              />
                              <span className="ml-3">
                                {post.likedIds.length}
                              </span>
                            </div>
                            <div className="flex items-center mr-6">
                              {/* <svg
                                className="fill-current h-5 w-auto"
                                viewBox="0 0 24 24"
                              >
                                <g>
                                  <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z" />
                                </g>
                              </svg> */}
                              <span className="ml-2">93 comments</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                </div>
              ))
          : null}
        <div className="flex border-t-2 border-gray-400 justify-center  min-h-auto">
          {" "}
        </div>
      </div>
    </div>
  );
};

export default Posts;
