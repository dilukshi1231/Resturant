// src/page/Login.js
/*import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginRedux } from '../redux/userSlice';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Example fetch call, replace with your API
    const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    if (response.ok) {
      dispatch(loginRedux({ user: result.user, role: result.role }));
      toast.success('Logged in successfully!');
      navigate('/');
    } else {
      toast.error(result.message || 'Login failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
*/

import React, { useState } from 'react';
import loginSignupImage from "../assest/loginanimation.jpg";
import { BiHide, BiShow } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { loginRedux } from '../redux/userSlice';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleonChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;

    if (email && password) {
      try {
        const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const dataRes = await fetchData.json();
        console.log(dataRes);

        if (fetchData.ok) {
          toast.success(dataRes.message);
          
          // Dispatch login success action with the user data
          dispatch(loginRedux({ data: dataRes.user }));

          // Optionally, save token if your backend returns one
          if (dataRes.token) {
            localStorage.setItem("token", dataRes.token);
          }

          navigate("/");  // Navigate to the home page on success
        } else {
          toast.error(dataRes.message);
        }
      } catch (err) {
        console.error("Error during fetch:", err);
        toast.error("An error occurred while logging in. Please try again later.");
      }
    } else {
      toast.error("Please fill in both email and password fields.");
    }
  };

  const handleShowPassword = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <div className='p-3 md:p-4'>
      <div className='w-full max-w-sm bg-white m-auto flex items-center flex-col p-4'>
        <div className='w-20 overflow-hidden rounded-full drop-shadow-md shadow-md flex m-auto'>
          <img src={loginSignupImage} className='w-full' alt="login animation"/>
        </div>

        <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
          <label htmlFor='email'>Email</label>
          <input
            type="text"
            id="email"
            name="email"
            className='mt-1 mb-2 w-full bg-orange-100 px-2 py-1 rounded focus-within:outline-blue-500'
            value={data.email}
            onChange={handleonChange}
          />

          <label htmlFor='password'>Password</label>
          <div className='flex px-2 py-1 bg-orange-100 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-500'>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className='w-full bg-orange-100 border-none outline-none'
              value={data.password}
              onChange={handleonChange}
            />
            <span className="flex text-xl cursor-pointer" onClick={handleShowPassword}>
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4"
          >
            Login
          </button>
        </form>
        <p className="text-left text-sm mt-2">
          Don't have an account?{" "}
          <Link to="/signup" className="text-red-500 underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;



/*import React, { useState } from 'react';
import loginSignupImage from "../assest/loginanimation.jpg";
import { BiHide, BiShow } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import { useDispatch } from 'react-redux';
import { loginRedux } from '../redux/userSlice';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle input change
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;

    if (email && password) {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const dataRes = await response.json();
        console.log(dataRes);

        if (response.ok) {
          toast.success(dataRes.message);

          // Dispatch login success action with the user data
          dispatch(loginRedux(dataRes.user));

          // Optionally, save token if your backend returns one
          if (dataRes.token) {
            localStorage.setItem("token", dataRes.token);
          }

          navigate("/");  // Navigate to the home page on success
        } else {
          toast.error(dataRes.message);
        }
      } catch (err) {
        console.error("Error during fetch:", err);
        toast.error("An error occurred while logging in. Please try again later.");
      }
    } else {
      toast.error("Please fill in both email and password fields.");
    }
  };

  // Toggle password visibility
  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className='p-3 md:p-4'>
      <div className='w-full max-w-sm bg-white m-auto flex items-center flex-col p-4'>
        <div className='w-20 overflow-hidden rounded-full drop-shadow-md shadow-md flex m-auto'>
          <img src={loginSignupImage} className='w-full' alt="login animation"/>
        </div>

        <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
          <label htmlFor='email'>Email</label>
          <input
            type="text"
            id="email"
            name="email"
            className='mt-1 mb-2 w-full bg-orange-100 px-2 py-1 rounded focus-within:outline-blue-500'
            value={data.email}
            onChange={handleOnChange}
          />

          <label htmlFor='password'>Password</label>
          <div className='flex px-2 py-1 bg-orange-100 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-500'>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className='w-full bg-orange-100 border-none outline-none'
              value={data.password}
              onChange={handleOnChange}
            />
            <span className="flex text-xl cursor-pointer" onClick={handleShowPassword}>
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4"
          >
            Login
          </button>
        </form>
        <p className="text-left text-sm mt-2">
          Don't have an account?{" "}
          <Link to="/signup" className="text-red-500 underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

*/

/*
import React, { useState } from 'react';
import loginSignupImage from "../assest/loginanimation.jpg";
import { BiHide, BiShow } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginRedux } from '../redux/userSlice';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector(state => state.user);
  console.log(userData);  // For debugging, to see the logged-in user data

  const handleonChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;

    if (email && password) {
      try {
        const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const dataRes = await fetchData.json();
        console.log(dataRes);
        toast(userData.user.firstName+ dataRes.message)

        if (fetchData.ok) {
          toast.success(dataRes.message);
          
          // Dispatch login success action with the user data
          dispatch({ 
            type: "LOGIN_SUCCESS", 
            payload: dataRes.user 
          });

          // Optionally, save token if your backend returns one
          localStorage.setItem("token", dataRes.token);

          navigate("/");  // Navigate to the home page on success
        } else {
          toast.error(dataRes.message);
        }
      } catch (err) {
        console.error("Error during fetch:", err);
        toast.error("An error occurred while logging in. Please try again later.");
      }
    } else {
      toast.error("Please fill in both email and password fields.");
    }
  };

  const handleShowPassword = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <div className='p-3 md:p-4'>
      <div className='w-full max-w-sm bg-white m-auto flex items-center flex-col p-4'>
        <div className='w-20 overflow-hidden rounded-full drop-shadow-md shadow-md flex m-auto'>
          <img src={loginSignupImage} className='w-full' alt="login animation"/>
        </div>

        <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
          <label htmlFor='email'>Email</label>
          <input
            type="text"
            id="email"
            name="email"
            className='mt-1 mb-2 w-full bg-orange-100 px-2 py-1 rounded focus-within:outline-blue-500'
            value={data.email}
            onChange={handleonChange}
          />

          <label htmlFor='password'>Password</label>
          <div className='flex px-2 py-1 bg-orange-100 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-500'>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className='w-full bg-orange-100 border-none outline-none'
              value={data.password}
              onChange={handleonChange}
            />
            <span className="flex text-xl cursor-pointer" onClick={handleShowPassword}>
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4"
          >
            Login
          </button>
        </form>
        <p className="text-left text-sm mt-2">
          Don't have an account?{" "}
          <Link to="/signup" className="text-red-500 underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;*/


/*import React, { useState } from 'react';
import loginSignupImage from "../assest/loginanimation.jpg";
import { BiHide, BiShow } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const userData = useSelector(state => state)
  console.log(userData.user)

  const dispatch = useDispatch()

  const handleonChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;

    if (email && password) {
      try {
        const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const dataRes = await fetchData.json();
        console.log(dataRes);

        if (fetchData.ok) {
          toast.success(dataRes.message);
          dispatch(dataRes)
          navigate("/"); // Navigate to the home page on success
        } else {
          toast.error(dataRes.message);
        }
      } catch (err) {
        console.error("Error during fetch:", err);
        toast.error("An error occurred while logging in. Please try again later.");
      }
    } else {
      toast.error("Please fill in both email and password fields.");
    }
  };

  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };

  return (
    <div className='p-3 md:p-4'>
      <div className='w-full max-w-sm bg-white m-auto flex items-center flex-col p-4'>
        <div className='w-20 overflow-hidden rounded-full drop-shadow-md shadow-md flex m-auto'>
          <img src={loginSignupImage} className='w-full' alt="login animation"/>
        </div>

        <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
          <label htmlFor='email'>Email</label>
          <input
            type="text"
            id="email"
            name="email"
            className='mt-1 mb-2 w-full bg-orange-100 px-2 py-1 rounded focus-within:outline-blue-500'
            value={data.email}
            onChange={handleonChange}
          />

          <label htmlFor='password'>Password</label>
          <div className='flex px-2 py-1 bg-orange-100 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-500'>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className='w-full bg-orange-100 border-none outline-none'
              value={data.password}
              onChange={handleonChange}
            />
            <span className="flex text-xl cursor-pointer" onClick={handleShowPassword}>
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4"
          >
            Login
          </button>
        </form>
        <p className="text-left text-sm mt-2">
          Don't have an account?{" "}
          <Link to="/signup" className="text-red-500 underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;*/