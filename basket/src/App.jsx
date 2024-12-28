import Product from "./components/Product";
import Home from "./components/Home";
import ProductDetail from "./components/ProductDetail";
import Basket from "./components/Basket";
import WishList from "./components/WishList";
import { Routes, Route } from "react-router-dom";
import { ROUTER } from "./constant/router";
import NotFound from "./components/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";



function App() {
  const [products, setProducts] = useState([]);
  const [basket, setBasket] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [sortOption, setSortOption] = useState("");

  const getSortedProducts = (arr) => {
    let sortedProducts = [...arr];
    if (sortOption === "az") {
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "za") {
      sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOption === "low-high") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-low") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    return sortedProducts;
  };



  const updateProductCount = () => {
    const total = basket.reduce((total, product) => total + product.count, 0);
    const roundedTotal = Math.round(total);
    setQuantity(roundedTotal);
  };


  useEffect(() => {
    const savedBasketString = localStorage.getItem("basketArray");
    const savedWishListString = localStorage.getItem("wishListArray");

    if (savedBasketString) {
      const savedBasket = JSON.parse(savedBasketString);
      setBasket(savedBasket);
      setQuantity(savedBasket.length);
    }
    if (savedWishListString) {
      const savedWishList = JSON.parse(savedWishListString);
      setWishList(savedWishList);
    }
  }, [setBasket, setWishList]);

  useEffect(() => {
    updateProductCount();
    localStorage.setItem("basketArray", JSON.stringify(basket));
  }, [basket]);

  return (
    <>
      <Navbar
        quantity={quantity}
        setQuantity={setQuantity}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        wishList={wishList}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
      <Routes>
        <Route path={ROUTER.Home} element={<Home />} />
        <Route
          path={ROUTER.Product}
          element={
            <Product
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              basket={basket}
              setBasket={setBasket}
              products={products}
              setProducts={setProducts}
              wishList={wishList}
              getSortedProducts={getSortedProducts}
              sortOption={sortOption}
              setWishList={setWishList}
              setQuantity={setQuantity}
            />
          }
        />
        <Route
          path={ROUTER.ProductDetail + "/:id"}
          element={<ProductDetail />}
        />
        <Route
          path={ROUTER.Basket}
          element={
            <Basket
              quantity={quantity}
              setQuantity={setQuantity}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              basket={basket}
              setBasket={setBasket}
              sortOption={sortOption}
              getSortedProducts={getSortedProducts}
            />
          }
        />
        <Route
          path={ROUTER.WishList}
          element={
            <WishList
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              wishList={wishList}
              setWishList={setWishList}
              basket={basket}
              sortOption={sortOption}
              getSortedProducts={getSortedProducts}
              setBasket={setBasket}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
