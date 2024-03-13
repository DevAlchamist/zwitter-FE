import axios from "axios";

export function createPost(postData) {
  return new Promise((resolve, reject) =>
    axios
      .post("http://localhost:8080/api/post", postData, {
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
      .get("http://localhost:8080/api/post", {
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
        "http://localhost:8080/api/post/update",
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
      .get("http://localhost:8080/api/post/" + id)
      .then((response) => {
        const responseData = response;
        resolve(responseData);
      })
  );
}
export function fetchCommentByPostId(id) {
  return new Promise((resolve, reject) =>
    axios
      .get("http://localhost:8080/api/comment/" + id)
      .then((response) => {
        const responseData = response;
        resolve(responseData);
      })
  );
}
export function createComment(commentInfo) {
  return new Promise((resolve, reject) =>
    axios
      .post("http://localhost:8080/api/comment", commentInfo, {
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
      .get("http://localhost:8080/api/post/user/" + id)
      .then((response) => {
        const responseData = response;
        resolve(responseData);
      })
  );
}
export function deletePost(id) {
  return new Promise((resolve, reject) =>
    axios
      .delete("http://localhost:8080/api/post/delete", {
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
      .delete("http://localhost:8080/api/comment/delete", {
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
