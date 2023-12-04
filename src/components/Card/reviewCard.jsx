import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Rating,
  } from "@material-tailwind/react";
  
  export function ReviewCard({ review }) {
    return (
      <Card shadow={true} className="shadow-xl w-full max-w-[26rem] p-4">
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="mx-0 flex items-center gap-4 pt-0 pb-8"
        >
          <Avatar
            size="lg"
            variant="circular"
            src={review.userPhoto}
            alt={review.username}
          />
          <div className="flex w-full flex-col gap-0.5">
            <div className="flex items-center justify-between">
              <Typography variant="h5" color="blue-gray">
                {review.username}
              </Typography>
              <div className="5 flex items-center gap-0">
                <Rating readonly value={review.rating} />
              </div>
            </div>
            <Typography color="blue-gray">{new Date(review.reviewDate).toLocaleDateString("en-GB")}</Typography>
          </div>
        </CardHeader>
        <CardBody className="mb-6 p-0">
          <Typography>{review.feedback}</Typography>
        </CardBody>
      </Card>
    );
  }
  