// import React from "react";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// const SignUp = () => {
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const inputVal = async (data) => {
//     const { firstname, lastname, email, password } = data;
//     console.log("Sending Data:", { firstname, lastname, email, password });

//     try {
//       const response = await fetch(
//         "https://notes-management-system-backend.vercel.app/api/auth/register",
//         {
//           method: "POST",
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ firstname, lastname, email, password }),
//         }
//       );

//       const responseData = await response.json();
//       console.log("Server Response:", responseData);

//       if (response.ok) {
//         Swal.fire({
//           title: "Sign-up Successful!",
//           text: "You can now log in to your account.",
//           icon: "success",
//           confirmButtonColor: "#234e94",
//           confirmButtonText: "Go to Login",
//         }).then(() => {
//           navigate("/Login");
//         });
//       } else if (
//         response.status === 401 &&
//         responseData.message === "User already exists"
//       ) {
//         Swal.fire({
//           title: "Email already exists!",
//           text: "Try logging in or use a different email.",
//           icon: "warning",
//           confirmButtonColor: "#d33",
//           confirmButtonText: "OK",
//         });
//       } else {
//         Swal.fire({
//           title: "Sign-up Failed!",
//           text: responseData?.message || "Something went wrong!",
//           icon: "error",
//           confirmButtonColor: "#d33",
//           confirmButtonText: "Try Again",
//         });
//       }
//     } catch (error) {
//       console.error("Error signing up:", error);

//       Swal.fire({
//         title: "Error!",
//         text: "Something went wrong! Please try again.",
//         icon: "error",
//         confirmButtonColor: "#d33",
//         confirmButtonText: "OK",
//       });
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
//         <h2 className="text-4xl font-bold text-center">Sign Up</h2>

//         <form className="space-y-4" onSubmit={handleSubmit(inputVal)}>
//           <div>
//             <label
//               htmlFor="firstname"
//               className="block text-sm font-medium text-gray-700"
//             >
//               First Name
//             </label>
//             <input
//               {...register("firstname", { required: true })}
//               type="text"
//               className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your firstname"
//             />
//             {errors.firstname && (
//               <span className="text-red-500 text-sm">
//                 This field is required
//               </span>
//             )}
//           </div>

//           <div>
//             <label
//               htmlFor="lastname"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Last Name
//             </label>
//             <input
//               {...register("lastname", { required: true })}
//               type="text"
//               className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your lastname"
//             />
//             {errors.lastname && (
//               <span className="text-red-500 text-sm">
//                 This field is required
//               </span>
//             )}
//           </div>

//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Email
//             </label>
//             <input
//               {...register("email", { required: true })}
//               type="email"
//               className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your email"
//             />
//             {errors.email && (
//               <span className="text-red-500 text-sm">
//                 This field is required
//               </span>
//             )}
//           </div>

//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Password
//             </label>
//             <input
//               {...register("password", { required: true })}
//               type="password"
//               className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your password"
//             />
//             {errors.password && (
//               <span className="text-red-500 text-sm">
//                 This field is required
//               </span>
//             )}
//           </div>

//           <button
//             type="submit"
//             className="w-full px-4 py-2 font-semibold text-white bg-[#166534] rounded-lg hover:bg-[#149e49] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//           >
//             SignUp
//           </button>
//         </form>

//         <Link to="/Login">
//           <p className="text-sm pt-5 text-center text-gray-600">
//             Already have an account?{" "}
//             <span className="text-blue-500 hover:underline">Login</span>
//           </p>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default SignUp;







// import { useState } from "react";
// import API from "../Api/Api";
// import { Link, useNavigate } from "react-router-dom";

// const SignUp = () => {
//   const [form, setForm] = useState({ firstname: "", lastname: "", email: "", password: "" });
//   const navigate = useNavigate();

//   const handleChange = e => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       await API.post("api/auth/register", form);
//       navigate("/login");
//     } catch (err) {
//       alert("Registration failed!");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
//       <h2 className="text-2xl font-bold mb-4">Register</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input name="firstname" placeholder="First Name" className="input" onChange={handleChange} required />
//         <input name="lastname" placeholder="Last Name" className="input" onChange={handleChange} required />
//         <input name="email" type="email" placeholder="Email" className="input" onChange={handleChange} required />
//         <input name="password" type="password" placeholder="Password" className="input" onChange={handleChange} required />
//         <button className="btn w-full">Register</button>
//       </form>
//        <Link to="/Login">
//            <p className="text-sm pt-5 text-center text-gray-600">
//              Already have an account?{" "}
//             <span className="text-blue-500 hover:underline">Login</span>
//            </p>
//          </Link>
//     </div>
//   );
// };

// export default SignUp;











import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../Api/Api";
import toast from "react-hot-toast";

const SignUp = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/api/auth/register", form);
      toast.success("Registration successful!");
      navigate("/login");
    } catch (err) {
      toast.error("Registration failed!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="firstname"
              value={form.firstname}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              placeholder="First Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastname"
              value={form.lastname}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              placeholder="Last Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              placeholder="Email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
