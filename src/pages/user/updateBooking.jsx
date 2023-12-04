import React, { useEffect, useState } from "react";
import BookingForm from "../../components/Form/bookingForm";
import { useLocation } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UpdateBooking = () => {
  const { state } = useLocation();
  const axiosSecure = useAxiosSecure();
  const [parcel, setParcel] = useState();

  useEffect(() => {
    axiosSecure
      .get(import.meta.env.VITE_EXPRESS_API + `/bookings/get-parcel/${state}`)
      .then((res) => setParcel(res.data.parcel));
  }, [state]);


  return parcel && <BookingForm parcel={parcel} isUpdate={true}/>;
};

export default UpdateBooking;
