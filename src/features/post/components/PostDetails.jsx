import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCommentAsync,
  deleteCommentAsync,
  fetchCommentByPostIdAsync,
  fetchPostByIdAsync,
  selectPostComments,
  selectPostDetails,
} from "../postSlice";
import { formatDate } from "../../common/dateFormat";
import { selectLoggedInUser } from "../../auth/authSlice";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Textarea from "@mui/joy/Textarea";
import IconButton from "@mui/joy/IconButton";
import { Avatar, ClickAwayListener, MenuItem, MenuList } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import pfp from "../../../images/pfp-avatar.png";
import PostCard from "../../common/Post";
import { Menu } from "@mui/joy";
import CustomModal from "../../common/modal/Modal";

const PostDetails = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const postDetails = useSelector(selectPostDetails);
  const postComments = useSelector(selectPostComments);
  const user = useSelector(selectLoggedInUser);
  const params = useParams();

  const handleCommentDelete = (id) => {
    dispatch(deleteCommentAsync(id));
  };

  useEffect(() => {
    dispatch(fetchPostByIdAsync(params.id));
    dispatch(fetchCommentByPostIdAsync(params.id));
  }, [dispatch, params.id]);
  return (
    <div>
      {postDetails && (
        <>
          {postDetails && (
            <PostCard post={postDetails} updateDetailPost={true} />
          )}
          <div
            key={postDetails._id}
            className="flex justify-start  border-b-2 border-[#F0F0F0]  items-center "
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
                reset();
              })}
              className="w-full  py-3 bg-white rounded-lg px-4"
            >
              {/* <div className="flex flex-wrap -mx-3 mb-2">
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
                </div> */}

              <Box>
                <FormControl>
                  <FormLabel className="flex gap-1">
                    <Avatar
                      className=" rounded-full bg-[#F7F9FB]"
                      src={user?.profileImage?.url}
                      alt=""
                    />
                    Your comment
                  </FormLabel>
                  <Textarea
                    variant="soft"
                    sx={{
                      minWidth: 300,
                      outline: "none",
                      "&:focus": {
                        outline: "none",
                      },
                    }}
                    {...register("body", { required: "Type Something" })}
                    placeholder="Type Your Comment"
                    required
                    minRows={2}
                    endDecorator={
                      <Box
                        sx={{
                          display: "flex",
                          gap: "var(--Textarea-paddingBlock)",
                          pt: "var(--Textarea-paddingBlock)",
                          borderTop: "1px solid",
                          borderColor: "divider",
                          flex: "auto",
                        }}
                      >
                        <Button type="submit" sx={{ ml: "auto" }}>
                          Comment
                        </Button>
                      </Box>
                    }
                  />
                </FormControl>
              </Box>
            </form>
          </div>
        </>
      )}

      {!!postComments
        ? [...postComments]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((comment) => (
              <Comments
                comment={comment}
                currentUser={user}
                postDetails={postDetails}
                handleCommentDelete={handleCommentDelete}
              />
            ))
        : null}
    </div>
  );
};

const Comments = ({
  comment,
  currentUser,
  postDetails,
  handleCommentDelete,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDeleteModal, setDeleteOpenModal] = useState(false);

  const handleOpenModal = () => {
    setDeleteOpenModal(true);
  };

  const handleCloseModal = () => {
    setDeleteOpenModal(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="flex items-center px-6 mt-4 gap-3 font-jakarta-sans">
      <div className="flex flex-shrink-0 self-start cursor-pointer">
        <Avatar
          className=" rounded-full bg-[#F7F9FB]"
          src={
            comment.userId?.profileImage?.url
              ? comment.userId?.profileImage?.url
              : pfp
          }
          alt="profilePic"
        />
      </div>
      <div className="flex font-jakarta-sans items-center justify-center space-x-2">
        <div className="block">
          <div className="bg-gray-100 w-auto rounded-xl px-2 pb-2">
            <div className="font-medium">
              <Link
                to={`/profile/${comment.userId.id}`}
                className="hover:underline text-sm"
              >
                <small className="font-jakarta-sans">
                  {comment.userId.username}
                </small>
              </Link>
            </div>
            <div className="text-xs ml-1 font-jakarta-sans">{comment.body}</div>
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

      {(comment?.userId.id === currentUser.id ||
        postDetails?.user?.id === currentUser.id) && (
        <Box>
          <IconButton
            aria-label="post-menu"
            variant="plain"
            color="neutral"
            size="xs"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList id="split-button-menu" autoFocusItem>
                <MenuItem onClick={handleOpenModal}>Delete</MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Menu>
          <CustomModal open={openDeleteModal} handleClose={handleCloseModal}>
            <div className="text-[18px] text-left font-semibold text-[#4C4C4C] p-10">
              Do you want to Delete this Post.
            </div>
            <div className="pb-5 flex gap-3 ">
              <button
                onClick={handleCloseModal}
                className="items-center h-8 bg-[#C6DCBA] px-7  rounded-[8px] text-[#F3EDC8]"
              >
                Back
              </button>
              <button
                onClick={() => {
                  handleCommentDelete(comment._id);
                  setDeleteOpenModal(false);
                }}
                className="items-center h-8 bg-[#BF3131] px-7 rounded-[8px] text-[#F3EDC8]"
              >
                Delete
              </button>
            </div>
          </CustomModal>
        </Box>
      )}
    </div>
  );
};

export default PostDetails;
