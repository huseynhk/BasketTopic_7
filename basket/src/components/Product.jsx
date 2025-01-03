import React, { useEffect, useState, useMemo } from "react";
import { GetProducts } from "../service/api";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "../constant/router";
import { TbBasketCode } from "react-icons/tb";
import { MdShoppingBasket } from "react-icons/md";
import { GoHeartFill, GoHeart } from "react-icons/go";
import { toast } from "react-toastify";

const Product = ({
  basket,
  searchQuery,
  products,
  setProducts,
  wishList,
  getSortedProducts,
  sortOption,
  setWishList,
  setBasket,
  setQuantity,
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

  const addToBasket = (productId) => {
    const addProduct = products.find((product) => product.id === productId);
    const existProduct = basket.find((product) => product.id === productId);
    if (addProduct) {
      if (existProduct) {
        toast.warning("Product is already exist!", {
          autoClose: 1500,
        });
      } else {
        const updatedBasket = [...basket, { ...addProduct, count: 1 }];
        setBasket(updatedBasket);
        setQuantity((prevCount) => prevCount + 1);
        localStorage.setItem("basketArray", JSON.stringify(updatedBasket));
        toast.success("Product added successfully!", {
          autoClose: 1500,
        });
      }
    } else {
      toast.error("Product not found!", {
        autoClose: 1500,
      });
    }
  };
  const addToWishlist = (productId) => {
    const addProduct = products.find((product) => product.id === productId);
    const existProduct = wishList.find((product) => product.id === productId);
    if (addProduct) {
      if (existProduct) {
        toast.warning("Product is already in the wishlist!", {
          autoClose: 1500,
        });
      } else {
        const updatedWishList = [...wishList, addProduct];
        setWishList(updatedWishList);
        localStorage.setItem("wishListArray", JSON.stringify(updatedWishList));
        toast.success("Product added to wishlist successfully!", {
          autoClose: 1500,
        });
      }
    } else {
      toast.error("Product not found!", {
        autoClose: 1500,
      });
    }
  };
  const isExist = (arr, productId) => {
    const existProduct = arr.find((product) => product.id === productId);
    return existProduct;
  };

  const filteredProduct = products?.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const sortedProducts = useMemo(
    () => getSortedProducts(filteredProduct),
    [filteredProduct, sortOption]
  );

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        {loading ? (
          <div className="flex justify-center items-center h-72">
            <div className="animate-spin rounded-full h-32 w-32 border-t-8 mt-60 md:mt-12 border-cyan-300 border-opacity-50"></div>
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="flex justify-center items-center h-72">
            <h2 className="text-sky-300 text-6xl font-bold mt-20">
              Not Found
            </h2>
          </div>
        ) : (
          <div className="py-5  px-5 md:px-12 grid gap-x-16 gap-y-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
            {sortedProducts.map((product, index) => (
              <div className="bg-gray-800 text-gray-200 rounded-xl" key={index}>
                <img
                  className="w-full mb-8 h-60 object-cover "
                  src={product.images[0]}
                  alt={product.title}
                />
                <div className="px-4">
                  <h2 className="text-green-300 truncate">{product.title}</h2>
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
                    onClick={() => addToBasket(product.id)}
                    className="bg-blue-500 text-white p-2 md:p-3 rounded-lg hover:bg-blue-700 transition-all duration-500"
                  >
                    {isExist(basket, product.id) ? (
                      <TbBasketCode className="text-lg md:text-2xl" />
                    ) : (
                      <MdShoppingBasket className="text-lg md:text-2xl" />
                    )}
                  </button>
                  <button
                    onClick={() => addToWishlist(product.id)}
                    className=" p-3  transition-all duration-500"
                  >
                    {isExist(wishList, product.id) ? (
                      <GoHeartFill className="text-4xl md:text-5xl text-red-500" />
                    ) : (
                      <GoHeart className="text-4xl md:text-5xl text-red-500" />
                    )}
                  </button>
                  <button
                    className="bg-cyan-700 text-white px-1 py-2 md:p-3 rounded-lg hover:bg-cyan-900 transition-all duration-500"
                    onClick={() =>
                      navigate(`${ROUTER.ProductDetail}/${product.id}`)
                    }
                  >
                    Go Details
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
