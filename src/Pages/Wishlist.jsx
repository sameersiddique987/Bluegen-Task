import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../Api/Api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Wishlist = () => {
  const { user } = useAuth();
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.error("Please login to view wishlist");
      navigate("/login");
      return;
    }

    const fetchWishlist = async () => {
      try {
        const res = await API.get("api/products/wishlist");
        setWishlistProducts(res.data.products); 
      } catch (err) {
        console.error("Error loading wishlist", err);
        toast.error("Failed to load wishlist");
      }
    };

    fetchWishlist();
  }, [user, navigate]);

  const removeFromWishlist = async (productId) => {
    try {
      await API.post("/api/products/wishlist", { productId });
      setWishlistProducts((prev) =>
        prev.filter((product) => product._id !== productId)
      );
      toast.success("Removed from wishlist");
    } catch (err) {
      console.error(err);
      toast.error("Error removing product");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Wishlist ❤️</h1>

      {wishlistProducts?.length === 0 ? (
        <p className="text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlistProducts.map((product) => (
            <div key={product._id} className="border p-4 rounded-md shadow">
          
              <h2 className="mt-2 font-semibold">{product.title}</h2>
              <p>${product.price}</p>
              <button
                onClick={() => removeFromWishlist(product._id)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove ❤️
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;










