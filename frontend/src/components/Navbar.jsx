import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const {
    setShowRecruiterLogin,
    setShowLogin,
    userData,
    setUserData,
    setUserToken,
  } = useContext(AppContext);

  const logout = () => {
    setUserToken(null)
    localStorage.removeItem("userToken")
    setUserData(null)
    navigate("/")
}

  return (
    <div className="shadow py-4">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        <img
          onClick={() => navigate("/")}
          className="cursor-pointer"
          src={assets.logo}
          alt=""
        />
        {userData ? (
          <div className="flex items-center gap-3">
            <Link to={"/applications"}>Applied Jobs</Link>
            <p>|</p>
            <div className="flex items-center gap-3">
              <div className="relative group">
                {/* <img className='w-8 border rounded-full' src={companyData.image} alt="" /> */}
                <p className="max-sm:hidden bg-emerald-600 p-2 px-3 rounded-full text-white cursor-pointer">
                  {userData.name.split(" ")[0].charAt(0).toUpperCase() +
                    userData.name.split(" ")[0].slice(1).toLowerCase()}
                </p>
                <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                  <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm">
                    <li onClick={logout} className="py-1 px-2 cursor-pointer pr-10">Logout</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-4 max-sm:text-xs">
            <button
              onClick={(e) => setShowRecruiterLogin(true)}
              className="text-gray-600 cursor-pointer"
            >
              Recruiter Login
            </button>
            <button
              onClick={(e) => setShowLogin(true)}
              className="bg-emerald-600 text-white px-6 sm:px-9 py-2 rounded-full cursor-pointer"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
