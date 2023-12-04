import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import { toast} from 'react-toastify'

const AllParcels = () => {
  const axiosSecure = useAxiosSecure();
  const [parcels, setParcels] = useState([]);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [selectedDeliveryman, setSelectedDeliveryman] = useState("");
  const [approximateDeliveryDate, setApproximateDeliveryDate] = useState("");

  const fetchAllParcels = () => {
    axiosSecure
      .get(import.meta.env.VITE_EXPRESS_API + "/bookings/get-all-parcels")
      .then((res) => {
        setParcels(res.data.bookings);
      })
      .catch((error) => {
        console.error("Error fetching all parcels:", error);
      });
  };

  const handleManageClick = (parcel) => {
    setSelectedParcel(parcel);
  };

  const handleAssign = () => {
    // Make API request to update the database
    axiosSecure
      .put(
        import.meta.env.VITE_EXPRESS_API +
          `/bookings/assign-delivery/${selectedParcel._id}`,
        {
          deliverymanId: selectedDeliveryman,
          approximateDeliveryDate: approximateDeliveryDate,
        }
      )
      .then((res) => {
        // Update the local state or fetch all parcels again
        fetchAllParcels();
        // Close the modal
        setSelectedParcel(null);
        setSelectedDeliveryman("");
        setApproximateDeliveryDate("");
        toast.success("updated")
      })
      .catch((error) => {
        toast.error("Error assigning delivery:", error);
      });
  };

  // Fetch all parcels when the component mounts
  useEffect(() => {
    fetchAllParcels();
  }, []);

  return (
    <div>
      <h1>All Parcels</h1>
      <table className="min-w-full bg-white border border-gray-300">
        {/* Table Header */}
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 border-r border-gray-300">User's Name</th>
            <th className="py-2 px-4 border-r border-gray-300">Status</th>
            <th className="py-2 px-4 border-r border-gray-300">
              Requested Delivery Date
            </th>
            <th className="py-2 px-4 border-r border-gray-300">Booking Date</th>
            <th className="py-2 px-4">Manage</th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {parcels.map((parcel) => (
            <tr key={parcel._id} className="border-b border-gray-300">
              <td className="py-2 px-4 border-r border-gray-300">
                {parcel.username}
              </td>
              <td className="py-2 px-4 border-r border-gray-300">
                {parcel.status}
              </td>
              <td className="py-2 px-4 border-r border-gray-300">
                {new Date(parcel.requestedDeliveryDate).toLocaleDateString(
                  "en-GB"
                )}
              </td>
              <td className="py-2 px-4 border-r border-gray-300">
                {new Date(parcel.bookingDate).toLocaleDateString("en-GB")}
              </td>
              <td className="py-2 px-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => handleManageClick(parcel)}
                >
                  Manage
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {selectedParcel && (
        <Dialog open={true} handler={() => setSelectedParcel(null)}>
          <DialogHeader>Manage Parcel</DialogHeader>
          <DialogBody>
            {/* ... existing code ... */}

            {/* Add select field for deliveryman and date input field */}
            <div className="form-group">
              <label>Select Deliveryman:</label>
              <select
                className="form-control"
                value={selectedDeliveryman}
                onChange={(e) => setSelectedDeliveryman(e.target.value)}
              >
                <option value="deliveryman1">Deliveryman 1</option>
                <option value="deliveryman2">Deliveryman 2</option>
                {/* Add more options as needed */}
              </select>
            </div>

            <div className="form-group">
              <label>Approximate Delivery Date:</label>
              <input
                className="form-control"
                type="date"
                value={approximateDeliveryDate}
                onChange={(e) => setApproximateDeliveryDate(e.target.value)}
              />
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="secondary"
              onClick={() => setSelectedParcel(null)}
            >
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="primary" onClick={handleAssign}>
              <span>Assign</span>
            </Button>
          </DialogFooter>
        </Dialog>
      )}
    </div>
  );
};

export default AllParcels;
