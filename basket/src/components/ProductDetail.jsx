import React, { useEffect, useState } from "react";
import { GetSingleProducts } from "../service/api";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState("");

  const fetchSingleProduct = async () => {
    const response = await GetSingleProducts(id);
    setProductDetail(response);
  };

  useEffect(() => {
    fetchSingleProduct();
  }, [id]);

  return (
    <>
      <div className="flex justify-center items-center">
        {productDetail && (
          <div className="bg-gray-700 text-gray-400 mt-5 w-8/12 rounded-lg">
            <img
              className="w-full h-[435px] object-cover rounded-t-lg"
              src={productDetail.images[0]}
              alt={productDetail.title}
            />
            <div className="px-4 py-6">
              <h1>{productDetail.title}</h1>
              <p>{productDetail.description}</p>
              <p>{productDetail.category}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetail;
