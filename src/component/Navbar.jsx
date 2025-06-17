import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md p-4 flex flex-col sm:flex-row justify-between items-center">
      <Link to="/" className="text-2xl font-extrabold text-blue-700 mb-2 sm:mb-0">
        Bluegen
      </Link>

      <div className="space-x-4">
        {!user ? (
          <>
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-800 font-medium transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-blue-600 hover:text-blue-800 font-medium transition"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/wishlist"
              className="text-pink-600 hover:text-pink-800 font-medium transition"
            >
              Wishlist ❤️
            </Link>
            {user.isAdmin && (
              <Link
                to="/admin"
                className="text-red-600 hover:text-red-800 font-medium transition"
              >
                Admin
              </Link>
            )}
            <button
              onClick={logout}
              className="text-red-600 hover:text-red-800 font-medium transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
