import React, { useState, useMemo } from "react";
import { FiTrash2 } from "react-icons/fi";
import { LuShoppingBasket } from "react-icons/lu";
import { toast } from "react-toastify";
import { Dialog } from "@headlessui/react";

const Basket = ({
  basket,
  setBasket,
  searchQuery,
  setQuantity,
  getSortedProducts,
  sortOption,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRemoveAllModalOpen, setIsRemoveAllModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

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
    setIsRemoveAllModalOpen(false);
    toast.success("All products removed successfully!", {
      autoClose: 1500,
    });
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

  const sortedProducts = useMemo(
    () => getSortedProducts(filteredBasket),
    [filteredBasket, sortOption]
  );

  return (
    <>
      <div className="h-screen">
        <header className="bg-gray-700 py-3 text-gray-200 flex flex-col justify-center items-center">
          <h3 className="text-2xl font-bold text-stone-300 mb-2">
            Total: $ {calculateTotalPrice()}
          </h3>
          <button
            onClick={() => setIsRemoveAllModalOpen(true)}
            className="bg-red-700 rounded-md py-1 px-4 hover:bg-red-800 transition-all duration-500 text-gray-100 text-2xl"
          >
            Remove All
          </button>
        </header>

        {sortedProducts.length > 0 ? (
          <div className="py-5 px-5 md:px-12 grid gap-x-16 gap-y-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {sortedProducts.map((product, index) => (
              <div className="bg-gray-800 text-gray-200 rounded-xl" key={index}>
                <img
                  className="w-full mb-2 h-60 object-cover"
                  src={product.images[0]}
                  alt={product.title}
                />
                <div className="px-4">
                  <h2 className="text-green-300 truncate">
                    {product.title}
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
                    <p className="mb-3 text-cyan-300">$ {product.price}</p>
                    <p className="text-indigo-300">Rating: {product.rating}</p>
                  </div>
                  <span>Sum: $ {(product.price * product.count).toFixed(2)}</span>
                  <div className="flex items-center">
                    <div className="mr-3">
                      <button
                        onClick={() => deccrementQuantity(product.id)}
                        className="bg-red-300 text-gray-900 text-2xl rounded-md h-8 w-5  md:h-10 md:w-8  hover:bg-red-400 transition-all duration-500"
                      >
                        -
                      </button>
                      <span className="mx-2 text-3xl">{product.count}</span>
                      <button
                        onClick={() => incrementQuantity(product.id)}
                        className="bg-green-300 text-gray-900 text-2xl rounded-md  h-8 w-5  md:h-10 md:w-8 hover:bg-green-400 transition-all duration-500"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedProductId(product.id);
                        setIsModalOpen(true);
                      }}
                      className="bg-gray-300 rounded-lg p-1 md:py-2 md:px-3  hover:bg-gray-400 transition-all duration-500"
                    >
                      <FiTrash2 className="text-2xl md:text-3xl text-red-700" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <h1 className="text-cyan-300 text-[300px] mt-8">
              <LuShoppingBasket />
            </h1>
          </div>
        )}
      </div>

      {/* Modal for removing a single product */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-5">
            <h2 className="text-xl font-semibold">Remove Product</h2>
            <p>
              Are you sure you want to remove this product from your basket?
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => {
                  removeFromBasket(selectedProductId);
                  setIsModalOpen(false);
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Remove
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="ml-2 bg-gray-400 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Dialog>

      {/* Modal for removing all products */}
      <Dialog
        open={isRemoveAllModalOpen}
        onClose={() => setIsRemoveAllModalOpen(false)}
      >
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-5">
            <h2 className="text-xl font-semibold">Remove All Products</h2>
            <p>
              Are you sure you want to remove all products from your basket?
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={removeAllProducts}
                className="bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Remove All
              </button>
              <button
                onClick={() => setIsRemoveAllModalOpen(false)}
                className="ml-2 bg-gray-400 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Basket;
