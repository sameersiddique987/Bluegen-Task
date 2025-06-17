import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import API from "../Api/Api";
import StarRating from "./StarRating";

const ProductCard = ({ product }) => {
  const { user, setUser } = useAuth();
  const [inWishlist, setInWishlist] = useState(false);
  const [rating, setRating] = useState(null);

  useEffect(() => {
    if (user?.wishlist) {
      setInWishlist(user.wishlist.includes(product._id));
    }
  }, [user, product._id]);

  useEffect(() => {
    API.get(`/api/reviews/product/${product._id}`).then((res) => {
      setRating(res.data.averageRating);
    });
  }, [product._id]);

  const toggleWishlist = async () => {
    try {
      const res = await API.post("/api/products/wishlist", {
        productId: product._id,
      });
      setInWishlist(!inWishlist);
      setUser((prev) => ({ ...prev, wishlist: res.data.wishlist }));
    } catch (err) {
      console.error("Wishlist toggle error:", err);
    }
  };

  return (
    <div className="relative">
      <Link to={`/product/${product._id}`}>
        <div className="border rounded-xl p-4 shadow-sm bg-white hover:shadow-md transition-all duration-200">
          <h2 className="text-lg font-semibold mb-1">{product.title}</h2>
          <p className="text-gray-600 text-sm">{product.description}</p>
          <p className="text-gray-600 text-sm">Rs. {product.price}</p>

          <div className="mt-2">
            {rating && <StarRating value={rating} />}
          </div>
        </div>
      </Link>

      {user && (
        <button
          onClick={toggleWishlist}
          className="absolute top-4 right-4 text-red-500 text-xl z-10"
        >
          {inWishlist ? <FaHeart /> : <FaRegHeart />}
        </button>
      )}
    </div>
  );
};

export default ProductCard;



