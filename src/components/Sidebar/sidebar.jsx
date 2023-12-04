import {
  Cog6ToothIcon,
  PowerIcon,
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import useType from "../../hooks/useType";

export function DefaultSidebar() {
  const [type, isTypeLoading] = useType();
  const { Logout } = useAuth();
  const navigate = useNavigate();

  if (isTypeLoading) {
    return <progress className="progress w-56"></progress>;
  }

  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[15rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Sidebar
        </Typography>
      </div>

      <List>
        {type === "user" ? (
          <>
            <ListItem onClick={() => navigate("/dashboard/bookParcel")}>
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              Book Parcel
            </ListItem>
            <ListItem onClick={() => navigate("/dashboard/myParcel")}>
              <ListItemPrefix>
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>
              My parcel
            </ListItem>
            <ListItem onClick={() => navigate("/dashboard/myProfile")}>
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              Profile
            </ListItem>
          </>
        ) : (
          ""
        )}
        {type === "deliveryMen" &&
         (
          <>
            <ListItem onClick={() => navigate("/dashboard/deliveryList")}>
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              Delivery List
            </ListItem>
            <ListItem onClick={() => navigate("/dashboard/myReviews")}>
              <ListItemPrefix>
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>
              My Reviews
            </ListItem>
          </>
        )}
        {type === "admin" ? (
          <>
            <ListItem onClick={() => navigate("/dashboard/allDeliveryMen")}>
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              Delivery men list
            </ListItem>
            <ListItem onClick={() => navigate("/dashboard/allUsers")}>
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              User List
            </ListItem>
            <ListItem onClick={() => navigate("/dashboard/allParcels")}>
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              Parcel List
            </ListItem>
            <ListItem onClick={() => navigate("/dashboard/statistics")}>
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              Statistics
            </ListItem>
          </>
        ) : (
          <></>
        )}

        <>
          <hr className="my-2 border-blue-gray-50" />
          <ListItem onClick={() => navigate("/")}>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Home
          </ListItem>
          <ListItem
            onClick={() => {
              Logout();
            }}
          >
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </>
      </List>
    </Card>
  );
}
