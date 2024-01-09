import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostByIdAsync,
  selectPostDetails,
  updatePostAsync,
} from "../postSlice";
import { formatDate } from "../../common/dateFormat";
import { CiHeart } from "react-icons/ci";
import { selectLoggedInUser } from "../../auth/authSlice";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

const PostDetails = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const postDetails = useSelector(selectPostDetails);
  const user = useSelector(selectLoggedInUser);
  const params = useParams();

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
          updateDetailPost: true,
        })
      );
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  useEffect(() => {
    dispatch(fetchPostByIdAsync(params.id));
  }, [dispatch, params.id]);
  return (
    <div className="overflow-y-auto h-[645px] scroll no-scrollbar">
      <div>
        {postDetails && (
          <div
            key={postDetails.user.id}
            className=" flex items-center justify-center h-5/6 "
          >
            <div className="bg-white  p-5 rounded-xl border h-fit">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <img
                    className="h-auto w-auto rounded-full"
                    src="https://pbs.twimg.com/profile_images/1287562748562309122/4RLk5A_U_x96.jpg"
                  />
                  <div className="ml-1.5 text-sm leading-tight">
                    <span className=" font-bold block ">
                      {postDetails.user.name}
                    </span>
                    <span className=" font-normal block">
                      @{postDetails.user.username}
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
              </div>
              <div className="ml-10">
                <p className=" block text-lg leading-snug mt-3">
                  {postDetails.content}
                </p>
                <img
                  className="mt-2 z-10 rounded-2xl border h-auto  border-gray-100"
                  src="https://pbs.twimg.com/media/EpkuplDXEAEjbFc?format=jpg&name=medium"
                />
                <p className="text-base py-1 my-0.5">
                  {formatDate(postDetails.createdAt)}
                </p>
                <div className="border-gray-200 dark:border-gray-600 border border-b-0 my-1" />
                <div className=" flex mt-3">
                  <div className="flex items-center mr-6">
                    <CiHeart
                      onClick={() => {
                        console.log("user", user);
                        handleLike(postDetails._id, user);
                      }}
                      className={`fill-current  h-5 w-auto ${
                        postDetails.likedIds &&
                        postDetails.likedIds.includes(user.id)
                          ? "bg-red-500"
                          : ""
                      }  `}
                    />
                    <span className="ml-3">{postDetails.likedIds.length}</span>
                  </div>
                  <div className="flex items-center mr-6">
                    <svg
                      className="fill-current h-5 w-auto"
                      viewBox="0 0 24 24"
                    >
                      <g>
                        <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z" />
                      </g>
                    </svg>
                    <span className="ml-3">
                      93 people are Tweeting about this
                    </span>
                  </div>
                </div>
              </div>

              {/* comments */}
              <div className="flex mx-auto items-center shadow-lg mb-4 max-w-lg">
                <form
                  onSubmit={handleSubmit((data) => {
                    console.log(data);
                  })}
                  className="w-full max-w-xl bg-white rounded-lg px-4 pt-2"
                >
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">
                      Add a new comment
                    </h2>
                    <div className="w-full md:w-full px-3 mb-2 mt-2">
                      <textarea
                        className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                        name="comment"
                        id="comment"
                        {...register("comment", { required: true })}
                        placeholder="Type Your Comment"
                        required=""
                        defaultValue={""}
                      />
                      <div className="w-full  flex items-start md:w-full px-3">
                        <div className="flex items-start w-1/2 text-gray-700 px-2 mr-auto">
                          <svg
                            fill="none"
                            className="w-5 h-5 text-gray-600 mr-1"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <p className="text-xs md:text-sm pt-px">
                            Some HTML is okay.
                          </p>
                        </div>
                        <div className="-mr-1">
                          <input
                            type="submit"
                            className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                            defaultValue="Post Comment"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetails;
