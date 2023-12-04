import { Button, Card, Input, Typography } from "@material-tailwind/react";

import { useAuth } from "../../context/authContext";
import DatePicker from "../DatePicker/datePicker";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import { toast } from "react-toastify";

const BookingForm = ({ parcel, isUpdate }) => {
  const [date, setDate] = useState();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: parcel?.phone,
      parcelType: parcel?.parcelType,
      parcelWeight: parcel?.parcelWeight,
      receiverName: parcel?.receiverName,
      receiverPhone: parcel?.receiverPhone,
      deliveryAddress: parcel?.deliveryAddress,
      latitude: parcel?.latitude,
      longtitude: parcel?.longtitude,
    },
  });

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const onSubmit = (data) => {
    axiosSecure
      .post(import.meta.env.VITE_EXPRESS_API + "/bookings/book-parcel", {
        ...data,
        username: user?.displayName,
        email: user?.email,
        requestedDeliveryDate: date,
        price: watch("parcelWeight") * 50,
      })
      .then((res) => {
        if (res.data.success) toast.success("Booking created successfully!");
        else toast.error("Error creating booking. Please try again.");
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const onUpdate = (data) => {
    axiosSecure
      .put(import.meta.env.VITE_EXPRESS_API + `/bookings/update-parcel/${parcel?._id}`, {
        ...data,
        username: user?.displayName,
        email: user?.email,
        requestedDeliveryDate: date || parcel?.requestedDeliveryDate,
        price: watch("parcelWeight") * 50,
      })
      .then((res) => {
        if (res.data.success) toast.success("Booking updated successfully!");
        else toast.error("Error updating booking. Please try again.");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onInvalid = (errors) => console.error(errors);

  return (
    <div className="flex justify-center min-h-screen">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Book an item
        </Typography>
        <form
          onSubmit={handleSubmit(isUpdate ? onUpdate : onSubmit, onInvalid)}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Username
            </Typography>
            <Input
              disabled
              value={user?.displayName}
              size="lg"
              placeholder="Username"
              type="text"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              User email
            </Typography>
            <Input
              disabled
              value={user?.email}
              size="lg"
              placeholder="User email"
              type="text"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Phone Number
            </Typography>
            <Input
              size="lg"
              placeholder="Phone number"
              type="tel"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("phone", { required: true })}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Parcel Type
            </Typography>
            <Input
              size="lg"
              placeholder="Parcel type"
              type="text"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("parcelType", { required: true })}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Parcel Weight
            </Typography>
            <Input
              size="lg"
              placeholder="Parcel Weight"
              type="number"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("parcelWeight", { required: true })}
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Receiver name
            </Typography>
            <Input
              size="lg"
              placeholder="receiver name"
              type="text"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("receiverName", { required: true })}
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Receiver phone
            </Typography>
            <Input
              size="lg"
              placeholder="Receiver phone"
              type="tel"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("receiverPhone", { required: true })}
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Delivery Address
            </Typography>
            <Input
              size="lg"
              placeholder="Delivery Address"
              type="tel"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("deliveryAddress", { required: true })}
            />

            <DatePicker
              dateSet={setDate}
              defaultDate={parcel?.requestedDeliveryDate}
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Delivery Address Latitude
            </Typography>
            <Input
              size="lg"
              placeholder="Delivery Address Latitude"
              type="tel"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("latitude", { required: true })}
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Delivery Address Longtitude
            </Typography>
            <Input
              size="lg"
              placeholder="Delivery Address Longitude"
              type="tel"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("longtitude", { required: true })}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Price
            </Typography>
            <Input
              disabled
              size="lg"
              placeholder="Price"
              value={watch("parcelWeight") * 50 || 0}
              type="tel"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          {
            isUpdate ? 
            <Button type="submit" className="mt-6" fullWidth>
                Update
            </Button>
            :
            <Button type="submit" className="mt-6" fullWidth>
              Submit
            </Button>
          }{" "}
        </form>
      </Card>
    </div>
  );
};

export default BookingForm;
