import axios from "axios";

export function createPost(postData) {
  return new Promise((resolve, reject) =>
    axios
      .post("http://localhost:8080/api/post", postData, {
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
      .put("http://localhost:8080/api/post/update", updatedPostInfo, {
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
export function fetchPostById(id) {
  return new Promise((resolve, reject) =>
    axios.get("http://localhost:8080/api/post/" + id).then((response) => {
      const responseData = response;
      console.log("responseData", responseData);
      resolve(responseData);
    })
  );
}
