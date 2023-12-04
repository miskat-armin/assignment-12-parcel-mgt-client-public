import React from 'react';
import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";

const TopDeliveryManCard = ({ name, image, parcelsDelivered, averageRatings }) => {
  return (
    <Card className="mt-6 w-96">
      <CardHeader color="blue-gray" className="relative h-56">
        <img
          src={image}
          alt={`${name}'s image`}
          className="object-cover w-full h-full rounded-t-md"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {name}
        </Typography>
        <div className="flex justify-between">
          <Typography>
            Parcels Delivered: {parcelsDelivered}
          </Typography>
          <Typography>
            Avg. Ratings: {averageRatings}
          </Typography>
        </div>
      </CardBody>
    </Card>
  );
};

export default TopDeliveryManCard;