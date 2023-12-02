import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/mainLayout.jsx";
import ErrorPage from "../pages/errorPage.jsx";
import Home from "../pages/home";
import Registration from "../pages/registration.jsx";
import Signin from "../pages/signin.jsx";
import Dashboard from "../pages/dashboard.jsx";

const CustomRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

export default CustomRouter;
