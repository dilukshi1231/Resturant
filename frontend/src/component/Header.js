import React, { useState } from 'react';
import logo from "../assest/logo.jfif";
import { Link } from 'react-router-dom';
import { FaUserAlt } from "react-icons/fa";
import { BsCartFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { logoutRedux } from '../redux/userSlice';
import { toast } from 'react-hot-toast';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  // Fetch user data from Redux store
  const userData = useSelector((state) => state.user); 
  const cartItemNumber = useSelector((state) => state.product.cartItem);

  const dispatch = useDispatch();

  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logoutRedux());
    toast("Logout successfully");
  };

  // Check if the logged-in user is an admin
  const isAdmin = userData.email === process.env.REACT_APP_ADMIN_EMAIL;

  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="h-10">
            <img src={logo} className="h-full" alt="Logo" />
          </div>
        </Link>

        <div className="flex items-center gap-4 md:gap-7">
          {/* Desktop Menu */}
          <nav className="gap-4 md:gap-6 text-base md:text-lg hidden md:flex">
            <Link to={""}>Home</Link>
            <Link to={"menu/66ee0450cc3916f4eb8106b7"}>Menu</Link>
            <Link to={"about"}>About</Link>
            <Link to={"contact"}>Contact</Link>
          </nav>

          {/* Cart Icon with Item Count */}
          <div className="text-2xl text-slate-600 relative">
            <Link to={"cart"}>
              <BsCartFill />
              <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center">
                {cartItemNumber.length}
              </div>
            </Link>
          </div>

          {/* User Profile and Menu */}
          <div className="text-slate-600" onClick={handleShowMenu}>
            <div className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md">
              {userData.image ? (
                <img src={userData.image} className="h-full w-full" alt="User Profile" />
              ) : (
                <FaUserAlt />
              )}
            </div>

            {showMenu && (
              <div className="absolute right-2 bg-white py-2 shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
                <nav className="text-base md:text-lg flex flex-col md:hidden">
                  <Link to={""} className="px-2 py-1">Home</Link>
                  <Link to={"menu/66ee0450cc3916f4eb8106b7"} className="px-2 py-1">Menu</Link>
                  <Link to={"about"} className="px-2 py-1">About</Link>
                  <Link to={"contact"} className="px-2 py-1">Contact</Link>
                </nav>

                {/* Show Logout or Login/Signup Links */}
                {userData.email ? (
                  <>
                    <span className="whitespace-nowrap cursor-pointer">{userData.firstName}</span>
                    <button
                      className="whitespace-nowrap cursor-pointer"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to={"login"} className="whitespace-nowrap cursor-pointer">Login</Link>
                    <Link to={"signup"} className="whitespace-nowrap cursor-pointer">Signup</Link>
                  </>
                )}

                {/* Display Add New Product Link for Admin after Signup */}
                {isAdmin && (
                  <Link to={"newproduct"} className="whitespace-nowrap cursor-pointer mt-2">
                    Add New Product
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
