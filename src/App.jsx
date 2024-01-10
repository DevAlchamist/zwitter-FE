import { useEffect } from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/HomePage";
import Login from "./features/auth/components/Login";
import Signup from "./features/auth/components/Signup";
import Forgot from "./features/auth/components/Forgot";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthAsync, selectUserChecked } from "./features/auth/authSlice";
import PostDetailPage from "./pages/PostDetailPage";
import Protected from "./features/auth/components/Protected";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home></Home>
      </Protected>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Login></Login>
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
        <Signup></Signup>
      </>
    ),
  },
  {
    path: "/forgot",
    element: (
      <>
        <Forgot></Forgot>
      </>
    ),
  },
  {
    path: "/posts/:id",
    element: (
      <Protected>
        <PostDetailPage></PostDetailPage>
      </Protected>
    ),
  },
  {
    path: "/profile/:id",
    element: (
      <Protected>
        <ProfilePage></ProfilePage>
      </Protected>
    ),
  },
  {
    path: "*",
    element: (
      <>
        <NotFoundPage></NotFoundPage>
      </>
    ),
  },
]);

function App() {
  const dispatch = useDispatch();

  const userChecked = useSelector(selectUserChecked);

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  return (
    <>
      <div className="App ">
        {userChecked && <RouterProvider router={router} />}
      </div>
    </>
  );
}

export default App;
