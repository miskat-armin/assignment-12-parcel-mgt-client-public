import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/authContext";
import Swal from "sweetalert2";

const DeliveryList = () => {
  const axiosSecure = useAxiosSecure();
  const [deliveries, setDeliveries] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    // Fetch deliveries assigned to the logged-in delivery man
    const getMyDeliveries = async () => {
      try {
        const response = await axiosSecure.get(
          import.meta.env.VITE_EXPRESS_API +
            `/bookings/deliveries/${user?.email}`
        );
        setDeliveries(response.data.bookings);
      } catch (error) {
        console.error("Error fetching deliveries:", error);
      }
    };

    getMyDeliveries();
  }, [axiosSecure]);

  const handleCancel = (deliveryId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.put(
            import.meta.env.VITE_EXPRESS_API +
              `/bookings/update-status/${deliveryId}`,
            {
              status: "Cancelled",
            }
          );

          if (response.data.success) {
            toast.success("Delivery cancelled successfully");
          } else {
            // Handle unsuccessful response if needed
            console.error(
              "Error updating delivery status:",
              response.data.error
            );
          }
        } catch (error) {
          // Handle network or server errors
          console.error("Error updating delivery status:", error.message);
        }
      }
    });
  };

  const handleDeliver = (deliveryId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, mark it as delivered!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.put(
            import.meta.env.VITE_EXPRESS_API +
              `/bookings/update-status/${deliveryId}`,
            {
              status: "Delivered",
            }
          );

          if (response.data.success) {
            toast.success("Delivery marked as delivered successfully");
          } else {
            console.error(
              "Error updating delivery status:",
              response.data.error
            );
          }
        } catch (error) {
          console.error("Error updating delivery status:", error.message);
        }
      }
    });
  };

  return (
    <div>
      <h1>My Delivery List</h1>
      <table className="min-w-full bg-white border border-gray-300">
        {/* Table Header */}
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 border-r border-gray-300">
              Booked User's Name
            </th>
            <th className="py-2 px-4 border-r border-gray-300">
              Receivers Name
            </th>
            <th className="py-2 px-4 border-r border-gray-300">
              Booked User's Phone
            </th>
            <th className="py-2 px-4 border-r border-gray-300">
              Requested Delivery Date
            </th>
            <th className="py-2 px-4 border-r border-gray-300">
              Approximate Delivery Date
            </th>
            <th className="py-2 px-4 border-r border-gray-300">
              Receivers Phone Number
            </th>
            <th className="py-2 px-4 border-r border-gray-300">
              Receivers Address
            </th>
            <th className="py-2 px-4 border-r border-gray-300">
              View Location
            </th>
            <th className="py-2 px-4 border-r border-gray-300">Status</th>
            <th className="py-2 px-4 border-r border-gray-300">Cancel</th>
            <th className="py-2 px-4">Deliver</th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {deliveries.length > 0 &&
            deliveries.map((delivery) => (
              <tr key={delivery._id} className="border-b border-gray-300">
                <td className="py-2 px-4 border-r border-gray-300">
                  {delivery.username}
                </td>
                <td className="py-2 px-4 border-r border-gray-300">
                  {delivery.receiverName}
                </td>
                <td className="py-2 px-4 border-r border-gray-300">
                  {delivery.phone}
                </td>
                <td className="py-2 px-4 border-r border-gray-300">
                  {new Date(delivery.requestedDeliveryDate).toLocaleDateString(
                    "en-GB"
                  )}
                </td>
                <td className="py-2 px-4 border-r border-gray-300">
                  {new Date(
                    delivery.approximateDeliveryDate
                  ).toLocaleDateString("en-GB")}
                </td>
                <td className="py-2 px-4 border-r border-gray-300">
                  {delivery.receiverPhone}
                </td>
                <td className="py-2 px-4 border-r border-gray-300">
                  {delivery.deliveryAddress}
                </td>
                <td className="py-2 px-4 border-r border-gray-300">
                  <button onClick={() => handleViewLocation(delivery)}>
                    View Location
                  </button>
                </td>
                <td
                  className={`py-2 px-4 border-r border-gray-300  ${
                    delivery.status === "Cancelled"
                      ? "text-red-500" // Red for Cancelled
                      : delivery.status === "Delivered"
                      ? "text-green-500" // Green for Delivered
                      : "" // Default color for other statuses
                  }`}
                >
                  {delivery.status}
                </td>
                <td className="py-2 px-4 border-r border-gray-300">
                  <Button
                    disabled={
                      delivery.status === "Cancelled" ||
                      delivery.status === "Delivered"
                    }
                    onClick={() => handleCancel(delivery._id)}
                    color="red"
                  >
                    Cancel
                  </Button>
                </td>
                <td className="py-2 px-4">
                  <Button
                    disabled={
                      delivery.status === "Cancelled" ||
                      delivery.status === "Delivered"
                    }
                    onClick={() => handleDeliver(delivery._id)}
                    color="indigo"
                  >
                    Deliver
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveryList;
