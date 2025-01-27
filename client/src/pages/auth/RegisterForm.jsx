import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaPhoneVolume } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import { app } from "../../fireBaseConfig"; // Import your Firebase app

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth(app);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      setErrors({});
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/user/register`,
          formData
        );
        console.log("Registration successful:", response.data);
        navigate("/login");
      } catch (error) {
        console.error("Registration failed:", error);
        setErrors({ api: "Registration failed. Please try again." });
      }
    } else {
      setErrors(formErrors);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google sign-in successful:", result);
      navigate("/login");
    } catch (error) {
      console.error("Google sign-in failed:", error);
      setErrors({ api: "Google sign-in failed. Please try again." });
    }
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSendOtp = async () => {
    try {
      const recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {}
      );
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        recaptchaVerifier
      );
      setVerificationId(confirmationResult.verificationId);
    } catch (error) {
      console.error("Phone number sign-in failed:", error);
      setErrors({ api: "Phone number sign-in failed. Please try again." });
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const credential = await auth.signInWithPhoneNumber(verificationId, otp);
      console.log("Phone number sign-in successful:", credential);
      navigate("/login");
    } catch (error) {
      console.error("OTP verification failed:", error);
      setErrors({ api: "OTP verification failed. Please try again." });
    }
  };

  return (
    <div className="flex items-center justify-center mt-24">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Register
        </h2>
        <div className="flex items-center justify-center space-x-4 mb-6">
          <button
            className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center"
            type="button"
            onClick={handleGoogleSignIn}
          >
            <FcGoogle className="mr-2 text-2xl" />
            Google
          </button>
          <button
            className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center"
            type="button"
            onClick={() => setPhoneNumber("")}
          >
            <FaPhoneVolume className="mr-2 text-2xl" />
            Phone Number
          </button>
        </div>
        {phoneNumber && (
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label>
            <input
              className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              placeholder="Your Phone Number"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-4"
              type="button"
              onClick={handleSendOtp}
            >
              Send OTP
            </button>
            <div id="recaptcha-container"></div>
          </div>
        )}
        {verificationId && (
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="otp"
            >
              OTP
            </label>
            <input
              className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              id="otp"
              name="otp"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-4"
              type="button"
              onClick={handleVerifyOtp}
            >
              Verify OTP
            </button>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              id="name"
              name="name"
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              id="email"
              name="email"
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              id="password"
              name="password"
              type="password"
              placeholder="Your Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <div className="flex items-center justify-center mb-6">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              type="submit"
            >
              Register
            </button>
          </div>
          {errors.api && (
            <p className="text-red-500 text-xs mt-1 text-center">
              {errors.api}
            </p>
          )}
        </form>
        <div className="text-center text-gray-600">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Please login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
