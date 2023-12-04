import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import React from "react";

import CountUp from "react-countup";

const FeatureCard = ({ title, description, icon, count, countText }) => {
  return (
    <Card className="mt-6 w-96">
      <CardHeader color="blue-gray" className="relative h-56">
        <img src={icon} alt="icon" />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </CardBody>
      <CardFooter className="pt-0 text-3xl flex gap-2 items-center">
        <Typography className="text-xl">{countText}</Typography>
        <CountUp end={count} />
      </CardFooter>
    </Card>
  );
};

export default FeatureCard;
