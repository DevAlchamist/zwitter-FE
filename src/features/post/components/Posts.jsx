import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createPostAsync,
  deletePostAsync,
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

import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Textarea from "@mui/joy/Textarea";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import FormatBold from "@mui/icons-material/FormatBold";
import FormatItalic from "@mui/icons-material/FormatItalic";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Check from "@mui/icons-material/Check";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import CloseIcon from "@mui/icons-material/Close";

import DoneIcon from "@mui/icons-material/Done";
import ImageIcon from "@mui/icons-material/Image";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  ClickAwayListener,
  Typography,
} from "@mui/material";
import { AspectRatio, CardOverflow, Divider } from "@mui/joy";

const Posts = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const user = useSelector(selectLoggedInUser);

  const allPosts = useSelector(selectAllPosts);

  const postStatus = useSelector(selectPostStatus);

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

  // const handleUpload = (e, uploadId) => {
  //   const element = document.getElementById(uploadId);
  //   element.click();
  // };

  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileInputChange = async (event) => {
    const newFile = event.target.files[0];

    if (newFile) {
      const maxSizeInBytes = 5 * 1024 * 1024; // 5MB

      if (newFile.size > maxSizeInBytes) {
        console.log("File is too big. Maximum allowed size is 5MB.");
        return;
      }

      if (newFile.type.startsWith("image/")) {
        setSelectedImage(newFile);
        setFile(newFile);
      } else {
        console.log("Non-image file uploaded.");
        setSelectedImage(null);
        setFile(null);
      }
    } else {
      setFile(null);
    }
  };

  const renderFilePreview = () => {
    if (!file) return null;

    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB

    if (file.size > maxSizeInBytes) {
      return <p>File is too big. Maximum allowed size is 5MB.</p>;
    }

    if (file.type.startsWith("image/")) {
      return (
        <>
          <img
            className="object-cover h-5 w-5"
            src={URL.createObjectURL(file)}
            alt={file.name}
          />
          <CloseIcon
            onClick={() => {
              setFile(null);
            }}
            className="absolute text-red-600 h-3 w-3 inset-y-0 inset-x-4"
          />
        </>
      );
    } else {
      const reader = new FileReader();
      reader.readAsText(file);

      reader.onload = (e) => {
        return <p>{e.target.result}</p>;
      };

      return <p>An error occurred</p>;
    }
  };

  const handleDelete = (postId) => {
    dispatch(deletePostAsync(postId));
    // Handle post deletion
    console.log(`Deleting post with ID ${postId}`);
  };

  const handleShare = (postId) => {
    // Handle post sharing

    console.log(`Sharing post with ID ${postId}`);
  };

  useEffect(() => {
    dispatch(fetchAllPostAsync());
  }, [dispatch]);

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

  return (
    <>
      {postStatus === "loading" ? (
        <Loader />
      ) : (
        <div className=" h-full no-scrollbar w-full overflow-y-auto  ">
          <div>
            {/* Create Post */}
            <div>
              <div className="max-w-2xl mb-5 mx-auto">
                <form
                  encType="multipart/form-data"
                  onSubmit={handleSubmit((data) => {
                    console.log(data);
                    const formData = new FormData();
                    formData.append("id", user.id);
                    formData.append("content", data.content);
                    if (selectedImage) {
                      formData.append("postImage", selectedImage);
                    }
                    // formData.append("postImage", data.postImage[0]);
                    dispatch(createPostAsync(formData));
                    setFile(null);
                    reset();
                  })}
                >
                  <Box>
                    <FormControl>
                      <FormLabel className="flex gap-1">
                        <Avatar
                          className=" rounded-full bg-[#F7F9FB]"
                          src={user.profileImage.url}
                          alt=""
                        />
                        Your comment
                      </FormLabel>
                      <Textarea
                        {...register("content", {
                          required: "Content is Required",
                        })}
                        required
                        placeholder="Type something here…"
                        minRows={3}
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
                            <IconButton
                              aria-label="postImage"
                              variant="plain"
                              color="neutral"
                              component="label"
                            >
                              <ImageIcon
                              // onClick={(e) => {
                              //   handleUpload(e, "postImage");
                              // }}
                              />
                              <input
                                hidden
                                type="file"
                                name="postImage"
                                id="postImage"
                                onChange={(event) =>
                                  handleFileInputChange(event)
                                }
                              />
                            </IconButton>
                            <IconButton className=" cursor-default hover:bg-transparent">
                              {renderFilePreview()}
                            </IconButton>
                            <Button type="submit" sx={{ ml: "auto" }}>
                              Post
                            </Button>
                          </Box>
                        }
                        sx={{
                          minWidth: 300,
                        }}
                      />
                    </FormControl>
                  </Box>
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
                                  <img
                                    className="   h-full"
                                    src={post.postImage.url}
                                    alt=""
                                  />
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
                              className={` ${
                                liked[post._id] ? "text-red-600" : ""
                              }`}
                            />
                            <Typography className=" mx-1 font-jakarta-sans font-semibold text-sm">
                              {post.likedIds.length}
                            </Typography>
                          </IconButton>
                          <Divider orientation="vertical" />
                          <Link to={`/posts/${post._id}`}>
                            <IconButton
                              variant="plain"
                              color="neutral"
                              size="sm"
                            >
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
                  ))
              : null}
          </div>
        </div>
      )}
    </>
  );
};

const PostMenu = ({ post, currentUser, onDelete, onShare }) => {
  const [anchorEl, setAnchorEl] = useState(null);

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

  const handleShare = () => {
    onShare(post.id);
    handleClose();
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
        <MenuItem onClick={handleShare}>Share</MenuItem>

        {currentUser.id === post.user.id && (
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        )}
      </Menu>
    </>
  );
};

export default Posts;
