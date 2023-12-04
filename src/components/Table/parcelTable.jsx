import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import ReviewModal from "../dialog/reviewModal";
import { useAuth } from "../../context/authContext";

const ParcelsTable = ({ parcels }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedParcelId, setSelectedParcelId] = useState(null);

  const handleReview = (parcelId) => {
    setSelectedParcelId(parcelId);
    setShowReviewModal(true);
  };

  const handleCloseReviewModal = () => {
    setSelectedParcelId(null);
    setShowReviewModal(false);
  };

  const handleReviewSubmit = (reviewData) => {
    axiosSecure
      .post(
        import.meta.env.VITE_EXPRESS_API +
          `/reviews/post-review/${user?.email}`,
        {...reviewData, userPhoto: user?.photoURL}
      )
      .then((res) => {
        console.log(res.data)
        if (res.data.success) toast.success("Review submitted");
        else toast.error("Already submitted")
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .put(
            import.meta.env.VITE_EXPRESS_API + `/bookings/cancel-parcel/${id}`
          )
          .then((res) => {
            toast.success("Cancelled successfully");
          })
          .catch((error) => {
            toast.error("Could not be cancelled");
          });
      }
    });
  };
  return (
    <table className="min-w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          {tableHeader("Parcel Type")}
          {tableHeader("Requested Delivery Date")}
          {tableHeader("Approximate Delivery Date")}
          {tableHeader("Booking Date")}
          {tableHeader("Delivery Men ID")}
          {tableHeader("Booking Status")}
          {tableHeader("Actions")}
        </tr>
      </thead>
      <tbody>
        {parcels?.map((parcel) => (
          <tr key={parcel._id} className="border-b border-gray-300">
            {tableCell(parcel.parcelType)}
            {tableCell(
              new Date(parcel.requestedDeliveryDate).toLocaleDateString("en-GB")
            )}
            {tableCell(
              parcel.approximateDeliveryDate != null
                ? new Date(parcel.approximateDeliveryDate).toLocaleDateString(
                    "en-GB"
                  )
                : "Not fixed"
            )}
            {tableCell(
              new Date(parcel.bookingDate).toLocaleDateString("en-GB")
            )}
            {tableCell(parcel.deliverymenId || "Not assigned")}
            {tableCell(parcel.status)}
            <td className="p-4 space-x-2 flex items-center">
              {parcel.status === "Delivered" && (
                <>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => handleReview(parcel._id)}
                  >
                    Review
                  </button>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={() => handlePay(parcel._id)}
                  >
                    Pay
                  </button>
                </>
              )}
              {parcel.status === "pending" && (
                <>
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                    onClick={() =>
                      navigate("/dashboard/UpdateBooking", {
                        state: parcel._id,
                      })
                    }
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleCancel(parcel._id)}
                  >
                    Cancel
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>

      <ReviewModal
        show={showReviewModal}
        handleClose={handleCloseReviewModal}
        deliveryMenId={
          selectedParcelId
            ? parcels.find((parcel) => parcel._id === selectedParcelId)
                .deliverymenId
            : null
        }
        onSubmit={handleReviewSubmit}
      />
    </table>
  );
};

const tableHeader = (label) => (
  <th className="p-4 text-left border-r border-gray-300">{label}</th>
);

const tableCell = (value) => (
  <td className="p-4 border-r border-gray-300">{value}</td>
);

export default ParcelsTable;
