import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCommentAsync,
  fetchCommentByPostIdAsync,
  fetchPostByIdAsync,
  selectPostComments,
  selectPostDetails,
  updatePostAsync,
} from "../postSlice";
import { formatDate } from "../../common/dateFormat";
import { CiChat1, CiHeart } from "react-icons/ci";
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
  const postComments = useSelector(selectPostComments);
  // console.log(postComments);
  const user = useSelector(selectLoggedInUser);
  const params = useParams();

  // const [, set] = useState(second)

  const [liked, setLiked] = useState({});

  console.log(liked)

  useEffect(() => {
    if (postDetails && user) {
      const userLiked = { ...liked };

      const userHasLiked =
        postDetails.likedIds && postDetails.likedIds.includes(user.id);
      userLiked[postDetails._id] = userHasLiked;

      setLiked(userLiked);
    }
  }, [postDetails, user]);

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
    dispatch(fetchCommentByPostIdAsync(params.id));
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
              <div className="">
                <p className=" block text-lg leading-snug mt-3">
                  {postDetails.content}
                </p>
                <img
                  className="mt-2 z-10 rounded-2xl border h-auto  border-gray-100"
                  src="https://pbs.twimg.com/media/EpkuplDXEAEjbFc?format=jpg&name=medium"
                />
                <p className="text-base py-1 px-5 my-0.5">
                  {formatDate(postDetails.createdAt)}
                </p>
                <div className="border-gray-200 dark:border-gray-600 border border-b-0 my-1" />
                <div className=" flex mt-3 px-4">
                  <div className="flex items-center mr-6">
                    {liked[postDetails._id] ? (
                      <svg
                        onClick={() => handleLike(postDetails._id, user)}
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
                        onClick={() => handleLike(postDetails._id, user)}
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
                    <span className="ml-3">{postDetails.likedIds.length}</span>
                  </div>
                  <div className="flex items-center text-center mr-6">
                    <CiChat1
                      className="fill-current  h-5 w-auto"
                      viewBox="0 0 24 24"
                    />
                    <span className="ml-3">{postDetails.comments.length}</span>
                  </div>
                </div>
              </div>

              {/* comments */}
              <div className="flex mx-auto items-center shadow-lg">
                <form
                  onSubmit={handleSubmit((data) => {
                    console.log({
                      body: data.body,
                      postId: params.id,
                      userId: user.id,
                    });
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
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">
                      Add a new comment
                    </h2>
                    <div className="w-full md:w-full  px-3 mb-2 mt-2">
                      <textarea
                        className="bg-gray-100 *:first-letter: rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 outline-none"
                        name="body"
                        id="body"
                        {...register("body", { required: true })}
                        placeholder="Type Your Comment"
                        required=""
                        defaultValue={""}
                      ></textarea>
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

        {!!postComments
          ? [...postComments]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((comment) => (
                <div className="flex items-center px-6 mt-4">
                  <div className="flex flex-shrink-0 self-start cursor-pointer">
                    <img
                      src="https://images.unsplash.com/photo-1609349744982-0de6526d978b?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDU5fHRvd0paRnNrcEdnfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                      alt=""
                      className="h-8 w-8 object-cover rounded-full"
                    />
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="block">
                      <div className="bg-gray-100 w-auto rounded-xl px-2 pb-2">
                        <div className="font-medium">
                          <a href="#" className="hover:underline text-sm">
                            <small>{comment.userId.username}</small>
                          </a>
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
