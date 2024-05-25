import React, { useEffect, useState } from "react";
import axios from "axios";
import RatingStars from "../RatingStars/RatingStars";
import BASE_URL from "../../Route/Route";
import "./UserReviews.css";

const DisplayReviews = (props) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/reviews/getreviews`, {
          params: {
            eatery_id: props.eatery_id,
          },
        });
        setReviews(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {reviews.map((review) => (
        <div key={review._id}>
          <div className="review-container">
            <div className="name-rating">
              <p className="grey-text">Name: {review.name}</p>
              <RatingStars rating={review.rating} />
            </div>
            <p className="grey-text">Date: {review.date}</p>
            <p className="white-text">Review: {review.review}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayReviews;
