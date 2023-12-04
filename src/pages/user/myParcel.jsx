import { Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useAuth } from "../../context/authContext";
import ParcelsTable from "../../components/Table/parcelTable";

const MyParcel = () => {
  const axiosSecure = useAxiosSecure();
  const [parcels, setParcels] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all"); // Default to "all" statuses
  const { user } = useAuth();

  const fetchParcels = (status) => {
    const apiUrl =
      status === "all"
        ? `/bookings/get-all-parcels/${user?.email}`
        : `/bookings/get-parcels-by-status/${user?.email}/${status}`;

    axiosSecure
      .get(import.meta.env.VITE_EXPRESS_API + apiUrl)
      .then((res) => {
        setParcels(res.data.bookings);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching parcels:", error);
        setParcels([]); // Reset parcels to an empty array in case of an error
      });
  };

  useEffect(() => {
    fetchParcels(selectedStatus);
  }, [axiosSecure, user, selectedStatus]);

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-4">
        <label className="text-lg font-bold mr-2">Status:</label>
        <select
          className="p-2 border rounded"
          value={selectedStatus}
          onChange={handleStatusChange}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="on the way">On the Way</option>
          <option value="delivered">Delivered</option>
          <option value="returned">Returned</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {parcels.length === 0 ? (
        <p>No parcels found based on the selected status.</p>
      ) : (
        <ParcelsTable parcels={parcels} />
      )}
    </div>
  );
};

export default MyParcel;
