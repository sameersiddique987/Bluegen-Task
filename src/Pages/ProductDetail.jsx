import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../Api/Api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [editId, setEditId] = useState(null);

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/api/products/${id}`);
      setProduct(res.data);
    } catch (err) {
      toast.error("Error loading product");
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await API.get(`/api/reviews/product/${id}`);
      setReviews(res.data.reviews);
      setAvgRating(res.data.averageRating);
    } catch (err) {
      toast.error("Error loading reviews");
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, [id]);

  const handleSubmit = async () => {
    if (rating < 1 || rating > 5) {
      toast.error("Rating must be between 1 and 5");
      return;
    }

    try {
      if (editId) {
        await API.put(`/api/reviews/${editId}`, {
          comment: review,
          rating,
        });
        toast.success("Review updated");
        setEditId(null);
      } else {
        await API.post(`/api/reviews`, {
          productId: id,
          comment: review,
          rating,
        });
        toast.success("Review submitted");
      }

      setReview("");
      setRating(0);
      fetchReviews();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error submitting review");
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await API.delete(`/api/reviews/${reviewId}`);
      toast.success("Review deleted");
      fetchReviews();
    } catch (err) {
      toast.error("Failed to delete review");
    }
  };

  if (!product) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
    
      <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
      <p className="text-gray-700">{product.description}</p>
      <p className="mt-2 text-yellow-600 font-semibold">
        ⭐ {avgRating || 0} / 5
      </p>

      {user && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">
            {editId ? "Update Your Review" : "Leave a Review"}
          </h3>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full border p-2 rounded mb-2"
            placeholder="Your review"
          />
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full border p-2 rounded mb-2"
            placeholder="Rating (1 to 5)"
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white py-2 px-4 rounded"
          >
            {editId ? "Update Review" : "Submit Review"}
          </button>
          {editId && (
            <button
              onClick={() => {
                setEditId(null);
                setReview("");
                setRating(0);
              }}
              className="ml-2 bg-gray-400 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          reviews.map((r) => (
            <div
              key={r._id}
              className="border p-3 rounded mb-3 bg-gray-50 shadow-sm"
            >
              <p className="font-medium text-yellow-700">⭐ {r.rating}</p>
              <p className="text-gray-800">{r.comment}</p>
              <p className="text-sm text-gray-500 mt-1">
                — {r.user?.firstname || "Anonymous"}
              </p>

              {user && r.user?._id === user._id && (
                <div className="mt-2 flex gap-3">
                  <button
                    onClick={() => {
                      setEditId(r._id);
                      setReview(r.comment);
                      setRating(r.rating);
                    }}
                    className="text-blue-600 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(r._id)}
                    className="text-red-600 text-sm"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
