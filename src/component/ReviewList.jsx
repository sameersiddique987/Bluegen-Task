import { useEffect, useState } from "react";
import API from "../Api/Api";

const ReviewList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);

  const loadReviews = async () => {
    try {
      const res = await API.get(`/api/reviews/product/${productId}`);
      setReviews(res.data.reviews || []);
    } catch (err) {
      console.error("Error loading reviews", err);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [productId]);

  return (
    <div className="mt-6">
      <h3 className="font-semibold mb-2">Reviews</h3>
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet.</p>
      ) : (
        reviews.map((rev) => (
          <div key={rev._id} className="border-b py-2">
            <p className="font-medium">⭐ {rev.rating} Stars</p>
            <p className="text-gray-700">{rev.comment}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewList;
