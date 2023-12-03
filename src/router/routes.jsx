import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layout/dashboard.jsx";
import Layout from "../layout/mainLayout.jsx";
import AllDeliveryMen from "../pages/admin/allDeliveryMen.jsx";
import AllParcels from "../pages/admin/allParcels.jsx";
import AllUsers from "../pages/admin/allUsers.jsx";
import Statistics from "../pages/admin/statistics.jsx";
import DeliveryList from "../pages/deliveryMen/deliveryList.jsx";
import MyReviews from "../pages/deliveryMen/myReviews.jsx";
import ErrorPage from "../pages/errorPage.jsx";
import Home from "../pages/home";
import Registration from "../pages/registration.jsx";
import Signin from "../pages/signin.jsx";
import BookParcel from "../pages/user/bookParcel.jsx";
import MyParcel from "../pages/user/myParcel.jsx";
import Profile from "../pages/user/myProfile.jsx";
import AdminRoute from "./AdminRoute.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import DeliveryRoute from "./deliveryRoute.jsx";
import UserRoute from "./userRoute.jsx";

const CustomRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "signin",
        element: <Signin />,
      },
      {
        path: "registration",
        element: <Registration />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      //user routes
      {
        path: "bookParcel",
        element: (
          <UserRoute>
            <BookParcel />
          </UserRoute>
        ),
      },
      {
        path: "myProfile",
        element: (
          <UserRoute>
            <Profile />
          </UserRoute>
        ),
      },
      {
        path: "myParcel",
        element: (
          <UserRoute>
            <MyParcel />
          </UserRoute>
        ),
      },
      //delivery men routes
      {
        path: "deliveryList",
        element: (
          <DeliveryRoute>
            <DeliveryList />
          </DeliveryRoute>
        ),
      },
      {
        path: "MyReviews",
        element: (
          <DeliveryRoute>
            <MyReviews />
          </DeliveryRoute>
        ),
      },
      //admin routes
      {
        path: "statistics",
        element: (
          <AdminRoute>
            <Statistics />
          </AdminRoute>
        ),
      },
      {
        path: "allDeliveryMen",
        element: (
          <AdminRoute>
            <AllDeliveryMen />
          </AdminRoute>
        ),
      },
      {
        path: "allParcels",
        element: (
          <AdminRoute>
            <AllParcels />
          </AdminRoute>
        ),
      },
      {
        path: "allUsers",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default CustomRouter;
