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
              <div className="max-w-2xl py-3 mb-5 mx-auto">
                <form
                className=" px-4"
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
