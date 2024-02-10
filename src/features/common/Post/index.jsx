import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePostAsync, updatePostAsync } from "../../post/postSlice";
import { selectLoggedInUser } from "../../auth/authSlice";
import pfp from "../../../images/pfp-avatar.png";

import { Link } from "react-router-dom";

import Box from "@mui/joy/Box";

import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";

import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import {
  Card,
  CardContent,
  CardHeader,
  ClickAwayListener,
  FormControl,
  InputAdornment,
  OutlinedInput,
  Slide,
  Snackbar,
  Typography,
} from "@mui/material";
import { AspectRatio, CardOverflow, Divider } from "@mui/joy";
import CustomModal from "../../common/modal/Modal";

const PostCard = ({ post, updateDetailPost }) => {
  const dispatch = useDispatch();

  const [liked, setLiked] = useState({});

  const user = useSelector(selectLoggedInUser);

  const handleDelete = (postId) => {
    dispatch(deletePostAsync(postId));
    // Handle post deletion
    console.log(`Deleting post with ID ${postId}`);
  };

  const handleShare = (postId) => {
    // Handle post sharing

    console.log(`Sharing post with ID ${postId}`);
  };

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
          updateDetailPost: updateDetailPost,
        })
      );
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  useEffect(() => {
    if (Array.isArray(post) && user) {
      const userLiked = { ...liked };

      post.forEach((post) => {
        const userHasLiked = post.likedIds && post.likedIds.includes(user.id);
        userLiked[post._id] = userHasLiked;
      });

      setLiked(userLiked);
    } else if (post && user) {
      const userLiked = { ...liked };
      const userHasLiked = post.likedIds && post.likedIds.includes(user.id);
      userLiked[post._id] = userHasLiked;
      setLiked(userLiked);
    }
  }, [post, user]);

  return (
    <>
      <Box className=" no-scrollbar font-jakarta-sans border-t-2 border-[#F0F0F0] bg-white">
        <Card elevation={0}>
          <CardHeader
            avatar={
              <img
                className="h-9 w-9 bg-[#F7F9FB] object-cover rounded-full"
                src={
                  post.user?.profileImage?.url
                    ? post.user?.profileImage?.url
                    : pfp
                }
                alt={post.user.name}
              />
            }
            title={
              <span className=" font-jakarta-sans font-semibold  text-[#616161]">
                {post.user.name}
              </span>
            }
            subheader={
              <span className=" font-jakarta-sans font-normal text-[#BDBDBD]">
                {post.user.username}
              </span>
            }
          />

          <CardContent className="flex flex-col gap-5 py-6">
            <Typography>{post.content}</Typography>
            {post.postImage?.url && (
              <>
                {/* <CardOverflow> */}
                <AspectRatio
                  className="px-12   rounded-xl"
                  variant="outlined"
                  objectFit="cover"
                >
                  <img className="   h-full" src={post.postImage.url} alt="" />
                </AspectRatio>
                {/* </CardOverflow> */}
              </>
            )}
          </CardContent>
        </Card>
        <CardOverflow
          variant="soft"
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1,
            justifyContent: "space-around",
            py: 1,
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <IconButton variant="plain" color="neutral" size="sm">
            <FavoriteIcon
              onClick={() => handleLike(post._id, user)}
              className={` ${liked[post._id] ? "text-red-600" : ""}`}
            />
            <Typography className=" mx-1 font-jakarta-sans font-semibold text-sm">
              {post.likedIds.length}
            </Typography>
          </IconButton>
          <Divider orientation="vertical" />
          <Link to={`/posts/${post._id}`}>
            <IconButton variant="plain" color="neutral" size="sm">
              <CommentIcon />
              <Typography className=" mx-1 font-jakarta-sans font-semibold text-sm">
                {post.comments.length}
              </Typography>
            </IconButton>
          </Link>
          <Divider orientation="vertical" />
          <PostMenu
            post={post}
            currentUser={user}
            onDelete={handleDelete}
            onShare={handleShare}
          />
        </CardOverflow>
      </Box>
    </>
  );
};

const PostMenu = ({ post, currentUser, onDelete, onShare }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDeleteModal, setDeleteOpenModal] = useState(false);
  const [openShareModal, setShareOpenModal] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const handleOpenModal = () => {
    setDeleteOpenModal(true);
  };
  const handleShareOpenModal = () => {
    setShareOpenModal(true);
  };

  const handleCloseModal = () => {
    setDeleteOpenModal(false);
    setShareOpenModal(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    if (currentUser.id === post.user.id) {
      onDelete(post._id);
    }
    handleClose();
  };

  const handleCopy = () => {
    setOpenSnackBar(true);
    navigator.clipboard.writeText(
      `https://zwitter-plum.vercel.app/${post._id}`
    );
  };

  return (
    <>
      <IconButton
        aria-label="post-menu"
        variant="plain"
        color="neutral"
        size="sm"
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <ClickAwayListener onClickAway={handleClose}>
          <MenuList id="split-button-menu" autoFocusItem>
            <MenuItem onClick={handleShareOpenModal}>Share</MenuItem>

            {currentUser.id === post.user.id && (
              <MenuItem onClick={handleOpenModal}>Delete</MenuItem>
            )}
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
            onClick={handleDelete}
            className="items-center h-8 bg-[#BF3131] px-7 rounded-[8px] text-[#F3EDC8]"
          >
            Delete
          </button>
        </div>
      </CustomModal>
      <CustomModal open={openShareModal} handleClose={handleCloseModal}>
        <Snackbar
          open={openSnackBar}
          onClose={() => setOpenSnackBar(false)}
          message="Copied to clipboard"
          TransitionComponent={Slide}
          autoHideDuration={1200}
        />
        <FormControl
          className="py-8 items-start w-full px-6"
          variant="standard"
        >
          <OutlinedInput
            className="w-full"
            disabled
            defaultValue={`https://zwitter-plum.vercel.app/${post._id}`}
            endAdornment={
              <InputAdornment position="end">
                <ContentPasteIcon onClick={handleCopy} />
              </InputAdornment>
            }
          />
        </FormControl>
      </CustomModal>
    </>
  );
};

export default PostCard;
