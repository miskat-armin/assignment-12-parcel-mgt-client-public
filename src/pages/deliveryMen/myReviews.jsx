import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useAuth } from "../../context/authContext";
import { ReviewCard } from "../../components/Card/reviewCard";

const MyReviews = () => {
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    // Fetch reviews for the logged-in delivery man
    const fetchReviews = async () => {
      try {
        const response = await axiosSecure.get(
          import.meta.env.VITE_EXPRESS_API + `/reviews/delivery-man-reviews/${user?.email}`
        );
        setReviews(response.data.reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [axiosSecure]);

  return (
    <div>
      <h1>My Reviews</h1>
      {reviews.length > 0  && reviews.map((review, idx) => (
        <ReviewCard key={idx} review={review}/>
      ))}
    </div>
  );
};

export default MyReviews;
