import axios from "axios";

export function createPost(postData) {
  return new Promise((resolve, reject) =>
    axios
      .post("https://zwitter-be.vercel.app/api/post", postData, {
        withCredentials: true,
      })
      .then((response) => {
        const responseData = response;
        resolve(responseData);
      })
  );
}
export function fetchAllPost() {
  return new Promise((resolve, reject) =>
    axios
      .get("https://zwitter-be.vercel.app/api/post", {
        withCredentials: true,
      })
      .then((response) => {
        const responseData = response;
        resolve(responseData);
      })
  );
}
export function updatePost(updatedPostInfo) {
  return new Promise((resolve, reject) =>
    axios
      .put(
        "https://zwitter-be.vercel.app/api/post/update",
        updatedPostInfo,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const responseData = response;
        resolve(responseData);
      })
  );
}
export function fetchPostById(id) {
  return new Promise((resolve, reject) =>
    axios
      .get("https://zwitter-be.vercel.app/api/post/" + id)
      .then((response) => {
        const responseData = response;
        resolve(responseData);
      })
  );
}
export function fetchCommentByPostId(id) {
  return new Promise((resolve, reject) =>
    axios
      .get("https://zwitter-be.vercel.app/api/comment/" + id)
      .then((response) => {
        const responseData = response;
        resolve(responseData);
      })
  );
}
export function createComment(commentInfo) {
  return new Promise((resolve, reject) =>
    axios
      .post("https://zwitter-be.vercel.app/api/comment", commentInfo, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const responseData = response;
        resolve(responseData);
      })
  );
}
export function fetchUserAllPosts(id) {
  return new Promise((resolve, reject) =>
    axios
      .get("https://zwitter-be.vercel.app/api/post/user/" + id)
      .then((response) => {
        const responseData = response;
        resolve(responseData);
      })
  );
}
export function deletePost(id) {
  return new Promise((resolve, reject) =>
    axios
      .delete("https://zwitter-be.vercel.app/api/post/delete", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        data: { id: id },
      })
      .then((response) => {
        const responseData = response;
        resolve(responseData);
      })
  );
}
export function deleteComment(id) {
  return new Promise((resolve, reject) =>
    axios
      .delete("https://zwitter-be.vercel.app/api/comment/delete", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        data: { id: id },
      })
      .then((response) => {
        const responseData = response;
        resolve(responseData);
      })
  );
}
