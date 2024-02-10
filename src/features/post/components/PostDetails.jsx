import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCommentAsync,
  fetchCommentByPostIdAsync,
  fetchPostByIdAsync,
  selectPostComments,
  selectPostDetails,
} from "../postSlice";
import { formatDate } from "../../common/dateFormat";
import { selectLoggedInUser } from "../../auth/authSlice";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import pfp from "../../../images/pfp-avatar.png";
import PostCard from "../../common/Post";

const PostDetails = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const postDetails = useSelector(selectPostDetails);
  const postComments = useSelector(selectPostComments);
  const user = useSelector(selectLoggedInUser);
  const params = useParams();

  useEffect(() => {
    dispatch(fetchPostByIdAsync(params.id));
    dispatch(fetchCommentByPostIdAsync(params.id));
  }, [dispatch, params.id]);
  return (
    <div className="overflow-y-auto h-[645px] w-full scroll no-scrollbar">
      <div>
        {postDetails && (
          <>
            {postDetails && (
              <PostCard post={postDetails} updateDetailPost={true} />
            )}
            {/* comment */}
            <div
              key={postDetails._id}
              className="flex mx-auto  border-b-2 border-[#F0F0F0] justify-center items-center "
            >
              <form
                onSubmit={handleSubmit((data) => {
                  dispatch(
                    createCommentAsync({
                      body: data.body,
                      postId: params.id,
                      userId: user.id,
                    })
                  );
                })}
                className="w-full max-w-xl bg-white rounded-lg pl-4 pt-2"
              >
                <div className="flex flex-wrap -mx-3 mb-2">
                  <strong>Reply to {postDetails.user.username}</strong>
                  <div className="w-auto flex justify-between md:w-full  px-3 mb-2 mt-2">
                    <textarea
                      className="  bg-gray-100 *:first-letter: rounded border border-gray-400 leading-normal resize-none w-full px-3 font-medium placeholder-gray-700 outline-none"
                      name="body"
                      id="body"
                      {...register("body", { required: "Type Something" })}
                      placeholder="Type Your Comment"
                      required=""
                      defaultValue={""}
                    />

                    {/* {error && (
                    <p className="text-red-500 text-center">
                      {error || error.message}
                    </p>
                  )} */}
                    <div className=" ml-6 my-auto justify-center flex ">
                      <input
                        type="submit"
                        className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                        defaultValue="Post Comment"
                      />
                    </div>
                  </div>
                  {errors.body && (
                    <p className="text-red-500 left-6 mt-3 bottom-3 relative text-center">
                      {errors.body.message}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </>
        )}

        {!!postComments
          ? [...postComments]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((comment) => (
                <div className="flex items-center px-6 mt-4">
                  <div className="flex flex-shrink-0 self-start cursor-pointer">
                    <img
                      src={
                        comment.userId?.profileImage?.url
                          ? comment.userId?.profileImage?.url
                          : pfp
                      }
                      alt="profilePic"
                      className="h-8 w-8 object-cover rounded-full"
                    />
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="block">
                      <div className="bg-gray-100 w-auto rounded-xl px-2 pb-2">
                        <div className="font-medium">
                          <Link
                            to={`/profile/${comment.userId.id}`}
                            className="hover:underline text-sm"
                          >
                            <small>{comment.userId.username}</small>
                          </Link>
                        </div>
                        <div className="text-xs ml-1">{comment.body}</div>
                      </div>
                      <div className="flex justify-start items-center text-xs w-full">
                        <div className="font-semibold text-gray-700 px-2 flex items-center justify-center space-x-1">
                          <small className="self-center">.</small>
                          <a href="#" className="hover:underline">
                            <small>{formatDate(comment.createdAt)}</small>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch flex justify-center items-center transform transition-opacity duration-200 opacity-0 translate -translate-y-2 hover:opacity-100">
                    <a href="#" className="">
                      <div className="text-xs cursor-pointer flex h-6 w-6 transform transition-colors duration-200 hover:bg-gray-100 rounded-full items-center justify-center">
                        <svg
                          className="w-4 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                          />
                        </svg>
                      </div>
                    </a>
                  </div>
                </div>
              ))
          : null}
      </div>
    </div>
  );
};

export default PostDetails;
