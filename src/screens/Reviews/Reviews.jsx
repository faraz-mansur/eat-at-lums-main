import React from "react";
import AddReview from "../../components/AddReview/AddReview";
import SearchReviews from "../../components/SearchReview/SearchReviews";
import DisplayReviews from "../../components/GetReview/UserReviews";
import "./Reviews.css";
import { useLocation } from "react-router-dom";

export default function Reviews() {
  const location = useLocation();
  const eatery_id = location.state.eatery_id;
  return (
    <div>
      <SearchReviews eatery_id={eatery_id} />
      <AddReview eatery_id={eatery_id} />
      <DisplayReviews eatery_id={eatery_id} />
    </div>
  );
}
