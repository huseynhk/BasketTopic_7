import React, { useEffect,useMemo } from "react";
import { FiTrash2 } from "react-icons/fi";
import { LuShoppingBasket } from "react-icons/lu";
import { toast } from "react-toastify";


const Basket = ({
  basket,
  setBasket,
  searchQuery,
  setQuantity,
  getSortedProducts,
  sortOption
}) => {

  const removeFromBasket = (productId) => {
    const deletedProduct = basket.filter((product) => product.id !== productId);
    setBasket(deletedProduct);
    setQuantity((prevCount) => prevCount - 1);
    localStorage.setItem("basketArray", JSON.stringify(deletedProduct));
    toast.success("Product deleted successfully!", {
      autoClose: 1500,
    });
  };

  const removeAllProducts = () => {
    setBasket([]);
    setQuantity(0);
    localStorage.setItem("basketArray", JSON.stringify([]));
  };

  const incrementQuantity = (productId) => {
    const updatedBasket = basket.map((product) =>
      product.id === productId
        ? { ...product, count: product.count + 1 }
        : product
    );
    setBasket(updatedBasket);
    setQuantity((prevCount) => prevCount + 1);
    localStorage.setItem("basketArray", JSON.stringify(updatedBasket));
  };

  const deccrementQuantity = (productId) => {
    const updatedBasket = basket.map((product) =>
      product.id === productId
        ? // ? { ...product, count: Math.max(1, product.count - 1) }
          {
            ...product,
            count: product.count > 1 ? product.count - 1 : 1,
          }
        : product
    );

    setBasket(updatedBasket);
    setQuantity((prevCount) => prevCount - 1);
    localStorage.setItem("basketArray", JSON.stringify(updatedBasket));
  };

  const calculateTotalPrice = () => {
    const total = basket.reduce(
      (total, product) => total + product.price * product.count,
      0
    );
    const roundedTotal = total.toFixed(2); 
    return parseFloat(roundedTotal);
  };
  


  const filteredBasket = basket?.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = useMemo(() => getSortedProducts(filteredBasket), [filteredBasket, sortOption]);
  useEffect(() => {
    const savedBasket = JSON.parse(localStorage.getItem("basketArray") || []);
    setBasket(savedBasket);
    setQuantity(savedBasket.length);
  }, []);
  return (
    <>
   
      <div className="h-screen">
        <header className="bg-gray-700 py-5 text-gray-200 flex flex-col justify-center items-center">
          <h3 className="text-3xl font-bold text-stone-300 mb-2">
            Total: $ {calculateTotalPrice()}
          </h3>
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
                  <p className="text-indigo-300">
                    Category: {product.category}
                  </p>
                </div>

                <div className="flex items-center justify-between p-4">
                  <div>
                    <p className="mb-3 text-cyan-300">${product.price}</p>
                    <p className="text-indigo-300">Rating: {product.rating}</p>
                  </div>
                  <span>$ {(product.price * product.count).toFixed(2)}</span>
                  <div className="flex items-center">
                    <div className="mr-3">
                      <button
                        onClick={() => deccrementQuantity(product.id)}
                        className="bg-red-300 text-gray-900 text-2xl rounded-xl py-2 px-3 hover:bg-red-400 transition-all duration-500"
                      >
                        -
                      </button>
                      <span className="mx-2 text-3xl">{product.count}</span>
                      <button
                        onClick={() => incrementQuantity(product.id)}
                        className="bg-green-300 text-gray-900 text-xl py-2 px-3 rounded-xl hover:bg-green-400 transition-all duration-500"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromBasket(product.id)}
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
            <h1 className="text-cyan-300 text-[300px] mt-5">
              <LuShoppingBasket />
            </h1>
          </div>
        )}
      </div>
    </>
  );
};

export default Basket;
