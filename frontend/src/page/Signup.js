import React, { useState } from 'react';
import loginSignupImage from "../assest/loginanimation.jpg";
import { BiHide, BiShow } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleonChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, email, password, confirmPassword } = data;

    if (firstName && email && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/signup`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              password: data.password,
            }),
          });

          const result = await response.json();
          if (!response.ok) {
            throw new Error(result.message || 'Something went wrong during signup.');
          }

          toast.success(result.message); // Display success toast message
          navigate('/login'); // Navigate to login page
        } catch (error) {
          toast.error(error.message || 'Signup failed. Please try again.'); // Display error toast message
          console.error('Error during signup:', error);
        }
      } else {
        toast.error('Passwords do not match'); // Display password mismatch error
      }
    } else {
      toast.error('Please fill in all required fields'); // Display error for missing fields
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex items-center flex-col p-4">
        <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md flex m-auto">
          <img src={loginSignupImage} alt="signup-animation" className="w-full" />
        </div>
        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="mt-1 mb-2 w-full bg-orange-100 px-2 py-1 rounded focus-within:outline-blue-500"
            value={data.firstName}
            onChange={handleonChange}
            required
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="mt-1 mb-2 w-full bg-orange-100 px-2 py-1 rounded focus-within:outline-blue-500"
            value={data.lastName}
            onChange={handleonChange}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 mb-2 w-full bg-orange-100 px-2 py-1 rounded focus-within:outline-blue-500"
            value={data.email}
            onChange={handleonChange}
            required
          />

          <label htmlFor="password">Password</label>
          <div className="flex px-2 py-1 bg-orange-100 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-500">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              className="w-full bg-orange-100 border-none outline-none"
              value={data.password}
              onChange={handleonChange}
              required
            />
            <span className="flex text-xl cursor-pointer" onClick={handleShowPassword}>
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="flex px-2 py-1 bg-orange-100 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-500">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              className="w-full bg-orange-100 border-none outline-none"
              value={data.confirmPassword}
              onChange={handleonChange}
              required
            />
            <span className="flex text-xl cursor-pointer" onClick={handleShowConfirmPassword}>
              {showConfirmPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4"
          >
            Sign up
          </button>
        </form>
        <p className="text-left text-sm mt-2">
          Already have an account?{' '}
          <Link to="/login" className="text-red-500 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
