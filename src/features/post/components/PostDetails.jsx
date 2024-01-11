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
import { Link, useParams } from "react-router-dom";
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

  console.log(liked);

  useEffect(() => {
    if (postDetails && user) {
      const userLiked = { ...liked };

      const userHasLiked =
        postDetails.likedIds && postDetails.likedIds.includes(user.id);
      userLiked[postDetails._id] = userHasLiked;

      setLiked(userLiked);
    }
  }, [postDetails, user]);

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
    <div className="overflow-y-auto h-[645px] w-full scroll no-scrollbar">
      <div>
        {postDetails && (
          <ul key={postDetails._id} className="list-none">
            <li >
              {/*second tweet*/}
              <article className="transition duration-350 ease-in-out">
                <div className="flex flex-shrink-0 p-4 pb-0">
                  <Link
                    to={`/profile/${postDetails.user.id}`}
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
                      <Link
                        className="ml-3"
                        to={`/profile/${postDetails.user.id}`}
                      >
                        <p className="text-base leading-6 font-medium ">
                          {postDetails.user.name}
                          <span className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                            @{postDetails.user.username}
                          </span>
                        </p>
                        <span className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                          posted at - {formatDate(postDetails.createdAt)}
                        </span>
                      </Link>
                    </div>
                  </Link>
                </div>
                <div className="pl-16">
                  <p className="text-base width-auto font-medium  flex-shrink">
                    {postDetails.content}
                  </p>
                  <div className="md:flex-shrink pr-6 pt-3">
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
                  </div>
                  <div className="flex items-center py-4">
                    <div className="flex-1 flex items-center  text-xs  hover:text-red-600 transition duration-350 ease-in-out">
                      {/* like */}

                      {liked[postDetails._id] ? (
                        <svg
                          onClick={() => handleLike(params.id, user.id)}
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
                          onClick={() => handleLike(params.id, user.id)}
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
                      {postDetails.likedIds.length}
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
                      {postDetails.comments.length}
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
            {/* comment */}
            <div
              key={postDetails._id}
              className="flex mx-auto justify-center items-center shadow-lg"
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
          </ul>
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
