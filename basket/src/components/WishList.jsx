import React, { useEffect, useMemo } from "react";
import { FiTrash2 } from "react-icons/fi";
import { GoHeart } from "react-icons/go";
import { TbBasketCode } from "react-icons/tb";
import { MdShoppingBasket } from "react-icons/md";
import { toast } from "react-toastify";

const WishList = ({
  searchQuery,
  addToBasket,
  wishList,
  setWishList,
  basket,
  getSortedProducts,
  sortOption,
}) => {
  const removeFromWishlist = (productId) => {
    const updatedWishList = wishList.filter(
      (product) => product.id !== productId
    );
    setWishList(updatedWishList);
    localStorage.setItem("wishListArray", JSON.stringify(updatedWishList));
    toast.info("Product removed from wishlist.", {
      autoClose: 1500,
    });
  };
  const removeAllProducts = () => {
    setWishList([]);
    localStorage.setItem("wishListArray", JSON.stringify([]));
  };
  useEffect(() => {
    const savedItem = JSON.parse(localStorage.getItem("wishListArray") || []);
    setWishList(savedItem);
  }, []);

  const isExist = (productId) => {
    const existProduct = basket?.find((product) => product.id === productId);
    return existProduct;
  };

  const filteredList = wishList?.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const sortedProducts = useMemo(
    () => getSortedProducts(filteredList),
    [filteredList, sortOption]
  );

  return (
    <div className="h-screen">
      <header className="bg-gray-700 py-5 text-gray-200 flex flex-col justify-center items-center">
        <button
          onClick={removeAllProducts}
          className="bg-red-700 rounded-xl py-2 px-5 hover:bg-red-800 transition-all duration-500 text-gray-100 text-3xl"
        >
          Remove All
        </button>
      </header>

      {sortedProducts.length > 0 ? (
        <div className="py-5 px-10 grid gap-x-16 gap-y-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product, index) => (
            <div className="bg-gray-800 text-gray-200 rounded-xl" key={index}>
              <img
                className="w-full mb-2 h-60 object-cover"
                src={product.images[0]}
                alt={product.title}
              />
              <div className="px-2">
                <h2 className="text-green-300 truncate">
                  Title: {product.title}
                </h2>
                <p className="my-3 text-gray-400 truncate">
                  {product.description}
                </p>
                <p className="text-indigo-300">Category: {product.category}</p>
              </div>

              <div className="flex items-center justify-between p-4">
                <div>
                  <p className="mb-3 text-cyan-300">${product.price}</p>
                  <p className="text-indigo-300">Rating: {product.rating}</p>
                </div>

                <div className="flex items-center">
                  <div className="mr-3">
                    <button
                      onClick={() => addToBasket(wishList, product.id)}
                      className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-700 transition-all duration-500"
                    >
                      {isExist(product.id) ? (
                        <TbBasketCode className="text-2xl" />
                      ) : (
                        <MdShoppingBasket className="text-2xl" />
                      )}
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="bg-gray-300 rounded-xl py-2 px-5 hover:bg-gray-400 transition-all duration-500"
                  >
                    <FiTrash2 className="text-3xl text-red-700" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <h1 className="text-orange-300 text-[300px] mt-5">
            <GoHeart />
          </h1>
        </div>
      )}
    </div>
  );
};

export default WishList;
