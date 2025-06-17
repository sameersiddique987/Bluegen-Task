import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Layout from "./Layout.jsx";
import Login from "./Pages/Login.jsx";
import SignUp from "./Pages/SignUp.jsx";
import ProductDetail from "./Pages/ProductDetail.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./component/ProtectedRoute.jsx";
import Wishlist from "./Pages/Wishlist.jsx";
import AdminAddProduct from "./Pages/AdminAddProduct.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "Login",
        element: <Login />,
      },        
      {
        path: "SignUp",
        element: <SignUp />,
      },
       {
        path: "/product/:id",
        element:<ProductDetail />
      },
      { path:"/wishlist",
       element:<Wishlist />
      },
      { path: "/admin",
       element: <AdminAddProduct /> 
      },
      {
        path: "*",
        element: <h1>NOT FOUND</h1>,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
 
    <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
