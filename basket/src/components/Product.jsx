import React, { useEffect, useState, useMemo } from "react";
import { GetProducts } from "../service/api";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "../constant/router";
import { TbBasketCode } from "react-icons/tb";
import { MdShoppingBasket } from "react-icons/md";
import { GoHeartFill, GoHeart } from "react-icons/go";

const Product = ({
  basket,
  searchQuery,
  addToBasket,
  products,
  setProducts,
  wishList,
  addToWishlist,
  getSortedProducts,
  sortOption
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await GetProducts();
      setProducts(response.products);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };
  const isExist = (arr, productId) => {
    const existProduct = arr.find((product) => product.id === productId);
    return existProduct;
  };
  
  const filteredProduct = products?.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const sortedProducts = useMemo(() => getSortedProducts(filteredProduct), [filteredProduct, sortOption]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-24 w-24 border-t-8 border-green-500 border-opacity-50"></div>
          </div>
        ) : sortedProducts.length === 0 ? (
          <h2 className="text-green-300 text-4xl font-bold m-12">Not Found</h2>
        ) : (
          <div className="py-5 px-10 grid gap-x-16 gap-y-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
            {sortedProducts.map((product, index) => (
              <div className="bg-gray-800 text-gray-200 rounded-xl" key={index}>
                <img
                  className="w-full mb-8 h-60 object-cover "
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
                  <p className="text-indigo-300">
                    Category: {product.category}
                  </p>
                </div>

                <div className="flex items-center justify-between p-4">
                  <div>
                    <p className="mb-3 text-cyan-300">${product.price}</p>
                    <p className="text-indigo-300">Rating: {product.rating}</p>
                  </div>
                  <button
                    onClick={() => addToBasket(products,product.id)}
                    className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-700 transition-all duration-500"
                  >
                    {isExist(basket, product.id) ? (
                      <TbBasketCode className="text-2xl" />
                    ) : (
                      <MdShoppingBasket className="text-2xl" />
                    )}
                  </button>
                  <button
                    onClick={() => addToWishlist(product.id)}
                    className=" p-3  transition-all duration-500"
                  >
                    {isExist(wishList, product.id) ? (
                      <GoHeartFill className="text-5xl text-red-500" />
                    ) : (
                      <GoHeart className="text-5xl text-red-500" />
                    )}
                  </button>
                  <button
                    className="bg-indigo-500 text-white p-3 rounded-lg hover:bg-blue-700 transition-all duration-500"
                    onClick={() =>
                      navigate(`${ROUTER.ProductDetail}/${product.id}`)
                    }
                  >
                    Go Details Page
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Product;
