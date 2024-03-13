import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createPostAsync,
  fetchAllPostAsync,
  selectAllPosts,
  selectPostStatus,
} from "../postSlice";
import { selectLoggedInUser } from "../../auth/authSlice";

import Loader from "../../loader/Loader";

import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Textarea from "@mui/joy/Textarea";
import IconButton from "@mui/joy/IconButton";

import CloseIcon from "@mui/icons-material/Close";

import ImageIcon from "@mui/icons-material/Image";

import { Avatar } from "@mui/material";
import PostCard from "../../common/Post";

export const AllPost = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const user = useSelector(selectLoggedInUser);

  const allPosts = useSelector(selectAllPosts);

  const postUploadStatus = useSelector(selectPostStatus);

  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    dispatch(fetchAllPostAsync());
  }, [dispatch]);

  return (
    <>
      {postUploadStatus === "loading" ? (
        <Loader />
      ) : (
        <div className=" h-full no-scrollbar w-full overflow-y-auto  ">
          <div>
            {/* Create Post */}
            <div>
              <div className="max-w-full py-3 mb-5 w-full mx-auto">
                <form
                  className="px-4"
                  encType="multipart/form-data"
                  onSubmit={handleSubmit(async (data) => {
                    try {
                      // Dispatch async action to create post
                      dispatch(
                        createPostAsync({
                          id: user.id,
                          content: data.content,
                        })
                      );
                      // Clear file and form fields upon successful submission
                      setFile(null);
                      reset();
                    } catch (error) {
                      // Handle any potential errors here
                      console.error("Error creating post:", error);
                    }
                  })}
                >
                  <Box>
                    <FormControl>
                      <FormLabel className="flex gap-1">
                        <Avatar
                          className="rounded-full bg-[#F7F9FB]"
                          src={user.profileImage.url}
                          alt=""
                        />
                        {user.name}
                      </FormLabel>
                      <Textarea
                        variant="soft"
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

            {!!allPosts
              ? [...allPosts]
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((post) => <PostCard post={post} />)
              : null}
          </div>
        </div>
      )}
    </>
  );
};
