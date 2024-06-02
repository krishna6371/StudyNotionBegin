import React from "react";
import logo1 from "../../assets/Logo/Logo-Full-Light.png";
import { Link, matchPath } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { apiConnector } from "../../services/Apiconnector";
import { categories } from "../../services/api";
import { useState, useEffect } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import axios from "axios";
import { ProfileDropDown } from "../core/auth/ProfileDropDown";


export const NavBar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { cart } = useSelector((state) => state.cart);
  const location = useLocation();
  const [subLinks, setSubLinks] = useState([]);

  // const sublinks = [
  //   {
  //     title: "web devlopment",
  //     link: "/catalog/webdev",
  //   },
  //   {
  //     title: "Python",
  //     link: "/catalog/python",
  //   },
  // ];

  // for api calling use effect hook
  const fetchSublinks = async () => {
    try {
      // console.log("Before API call");
      const result = await axios.get(categories.COURSE_API);
      // console.log("printing the api list" + result);
      setSubLinks(result.data.data);
    } catch (error) {
      console.log(error);
      console.log("could not fetch the api list");
    }
  };
  useEffect(() => {
    fetchSublinks();
  }, []);

  const matchRoute = (route) => {
    if (!route) return false;
    return matchPath({ path: route, exact: true }, location.pathname) !== null;
  };

  return (
    <div className=" flex flex-row border-b-[1px]   h-14 border-b-richblack-500 items-center">
      <div className="  flex flex-row ml-8 w-11/12 max-w-[maxContent]  items-center  justify-between">
        <Link to="/">
          <img src={logo1} width={160} height={40} loading="lazy" alt="Logo" />
        </Link>
        {/* creating navabar */}
        <nav>
          <ul className="flex gap-x-7 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className="relative flex  flex- row items-center gap-2 group">
                    <p>{link.title}</p>
                    <IoIosArrowDropdown />
                    <div
                      className="invisible absolute left-[50%]  p-4  translate-x-[-50%] translate-y-[60%] top-[50%] flex flex-col  bg-richblack-5  text-richblack-900 
										rounded-md  transition-all duration-200
										group-hover:visible 
										group-hover:opacity-100 w-[300px] h-[50px]"
                    >
                      <div className="absolute left-[50%] top-0 translate-x-[80%] translate-y-[-40%] h-6 w-6 rotate-45  bg-richblack-5"></div>
                      {subLinks.length ? (
                        subLinks.map((sublink, index) => (
                          <Link to={`${sublink.name}`} key={index}>
                            <p>{sublink.name}</p>
                          </Link>
                        ))
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        {/* To show login ,signup and dashborad */}
        <div className="flex gap-x-4 items-center">
          {user && user?.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <FaShoppingCart />
              {cart > 0 && <span>{cart}</span>}
            </Link>
          )}
          {token === null && (
            <Link to="/login" className="">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Login
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup" className="">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                signup
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};
