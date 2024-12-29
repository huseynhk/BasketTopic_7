import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ROUTER } from "../constant/router";
import { MdShoppingBasket } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = ({
  quantity,
  searchQuery,
  setSearchQuery,
  wishList,
  sortOption,
  setSortOption,
}) => {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleResetSort = () => {
    setSortOption("");
  };
  useEffect(() => {
    setSearchQuery("");
    setIsMenuOpen(false)
  }, [pathname]);

  return (
    <>
      <div className="px-12 py-4 bg-gray-800 text-gray-300 flex justify-between items-center sticky top-0">
        <div className="hidden md:flex items-center  ">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-3 py-2 rounded-lg bg-gray-700 text-gray-300 "
          >
            <option value="">Sort by</option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
          <button
            onClick={handleResetSort}
            className="bg-blue-500 mx-2 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-all duration-500"
          >
            Reset
          </button>
        </div>

        {/* Hamburger Menu */}
        <div className="sm:hidden">
          <GiHamburgerMenu
            className="text-3xl cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>
        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } sm:flex flex-col sm:flex-row  items-center  bg-gray-700 sm:bg-transparent absolute sm:relative top-full left-0 w-full sm:w-auto z-50`}
        >
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-1 mt-3 md:mt-0 rounded-lg text-gray-800 outline outline-2 w-[200px] md:w-[300px]"
          />
          <div className="flex flex-col  md:flex-row items-center ml-0 md:ml-8 py-4 md:py-0">
            <Link
              className={`font-medium  text-[24px]  ${
                pathname === ROUTER.Home ? "text-cyan-300" : "text-gray-400"
              } cursor-pointer`}
              to={ROUTER.Home}
            >
              Home
            </Link>
            <Link
              className={`font-medium ml-0 md:ml-5 text-[24px] ${
                pathname === ROUTER.Product ? "text-cyan-300" : "text-gray-400"
              } cursor-pointer`}
              to={ROUTER.Product}
            >
              Products
            </Link>
          </div>
        </div>
        <div className="flex items-center">
          <Link
            className={`font-medium mr-3  ${
              pathname === ROUTER.Basket ? "text-red-300" : "text-gray-400"
            } cursor-pointer`}
            to={ROUTER.Basket}
          >
            <div className="flex items-center justify-center">
              <MdShoppingBasket className=" text-4xl" />
              <span className="bg-red-500 mb-5 ml-[2px] text-white h-6 w-6 rounded-full px-2 py-1 flex items-center justify-center">
                <span className="text-xl ">{quantity}</span>
              </span>
            </div>
          </Link>
          <Link
            className={`font-medium mr-3  ${
              pathname === ROUTER.WishList ? "text-red-300" : "text-gray-400"
            } cursor-pointer`}
            to={ROUTER.WishList}
          >
            <div className="flex items-center justify-center">
              <FaHeart className=" text-[33px]" />
              <span className="bg-red-500 mb-5  ml-[3px] text-white h-6 w-6 rounded-full px-2 py-1 flex items-center justify-center">
                <span className="text-xl ">{wishList.length}</span>
              </span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
