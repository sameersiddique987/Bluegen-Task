import { useState } from "react";
import API from "../Api/Api";
import toast from "react-hot-toast";

const ReviewForm = ({ productId, onReviewAdded }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post(`/api/reviews`, { productId, comment, rating });
      toast.success("Review submitted");
      setComment("");
      setRating(0);
      onReviewAdded(); // refresh reviews
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit review");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-4">
      <h3 className="font-semibold mb-2">Leave a review</h3>
      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="border p-2 rounded w-full mb-2"
        required
      >
        <option value="">Select Rating</option>
        {[1, 2, 3, 4, 5].map((r) => (
          <option key={r} value={r}>
            {r} Star{r > 1 && "s"}
          </option>
        ))}
      </select>
      <textarea
        placeholder="Your comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="border w-full p-2 rounded mb-2"
        required
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
