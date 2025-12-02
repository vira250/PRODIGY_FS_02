
import React from "react";
import { useAuth } from "../../context/authContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div
      className="
        flex flex-col md:flex-row 
        items-center md:items-center 
        justify-between 
        gap-2 md:gap-0
        h-auto md:h-14 
        py-2 md:py-0
        bg-gradient-to-r from-blue-500 to-blue-700 
        px-4 md:px-6 
        shadow-lg
      "
    >
      <p className="text-white font-semibold text-base md:text-lg text-center md:text-left">
        Welcome,{" "}
        <span className="underline decoration-yellow-300 decoration-2">
          {user.name}
        </span>
      </p>

      <button
        className="
          px-4 md:px-5 
          py-1.5 md:py-2 
          bg-yellow-400 
          text-blue-900 
          font-semibold 
          rounded-lg 
          shadow-md 
          transition 
          duration-300 
          hover:bg-yellow-500 
          hover:shadow-lg
          text-sm md:text-base
        "
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
