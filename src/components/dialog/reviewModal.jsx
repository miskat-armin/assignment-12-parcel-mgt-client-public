import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Rating
} from "@material-tailwind/react";

const ReviewModal = ({ show, handleClose, deliveryMenId, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    onSubmit({
      rating,
      feedback,
      deliveryMenId: deliveryMenId,
    });

    // Close the modal
    handleClose();
  };

  return (
    <Dialog open={show} handler={handleClose}>
      <DialogHeader>
        <h5 className="text-2xl font-semibold">Give Review</h5>
      </DialogHeader>
      <DialogBody>
        <div className="flex flex-col">
          <label className="text-gray-500">Rating out of 5</label>
          <Rating
            value={rating}
            onChange={(newRating) => setRating(newRating)}
          />
        </div>
        <div className="mt-4">
          <label className="text-gray-500">Feedback</label>
          <Input
            as="textarea"
            rows={3}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>
      </DialogBody>
      <DialogFooter>
        <Button color="red" onClick={handleClose}>
          Close
        </Button>
        <Button color="blue" onClick={handleSubmit}>
            submit
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ReviewModal;
