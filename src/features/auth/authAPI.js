import axios from "axios";

export function createUser(userData) {
  return new Promise(async (resolve, reject) => {
    axios
      .post("https://zwitter-be.vercel.app/api/auth/signup", userData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const responseData = response;
        resolve(responseData);
      });
    // const data = await response.json();
    // resolve({ data });
  });
}

export function loginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      axios
        .post("https://zwitter-be.vercel.app/api/auth/login", loginInfo, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          const responseData = response;
          resolve(responseData);
        });

      // if (response.ok) {
      //   const data = await response.data();
      //   resolve({ data });
      // } else {
      //   const error = await response;
      //   reject(error);
      // }
    } catch (error) {
      reject(error);
    }
  });
}

export function checkAuth() {
  return new Promise(async (resolve, reject) => {
    try {
      axios
        .get("https://zwitter-be.vercel.app/api/auth/check", {
          withCredentials: true,
        })
        .then((response) => {
          const responseData = response;
          resolve(responseData);
        })
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
}
export function resetPasswordreq(email) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        "https://zwitter-be.vercel.app/api/auth/reset-password-req",
        { email }
      );

      if (response.status === 200) {
        resolve(response.data);
      } else {
        reject(response.statusText);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function resetPassword(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        "https://zwitter-be.vercel.app/api/auth/reset-password",
        data
      );

      if (response.status === 200) {
        resolve(response.data);
      } else {
        reject(response.statusText);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function logoutUser() {
  return new Promise(async (resolve, reject) => {
    try {
      axios
        .get("https://zwitter-be.vercel.app/api/auth/logout", {
          withCredentials: true,
        })
        .then((response) => {
          const responseData = response;
          resolve(responseData);
        });
    } catch (error) {
      reject(error);
    }
  });
}
