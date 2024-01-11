import axios from "axios";

export function fetchAllUser({ username }) {
  let usernameQuery = "";

  if (username.length > 0) {
    usernameQuery += `username=${username}`;
  }

  return new Promise((resolve, reject) =>
    axios
      .get("http://localhost:8080/api/user?" + usernameQuery)
      .then((response) => {
        const responseData = response;
        resolve(responseData);
      })
  );
}

export function fetchUserById(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/user/" + userId
      );
      resolve(response);
    } catch (error) {
      console.error("Error fetching logged-in user:", error);
      throw error;
    }
  });
}

export function updateUser(updateUserInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.put(
        "http://localhost:8080/api/user/update",
        updateUserInfo,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      resolve(response);
    } catch (error) {
      console.error("Error fetching logged-in user:", error);
      reject(error);
    }
  });
}
