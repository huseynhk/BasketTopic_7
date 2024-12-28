
import axios from "axios";

const Api = axios.create({
  baseURL: "https://dummyjson.com/products",
});

export const GetProducts = async () => {
  try {
    const response = await Api.get("/");
    if (response.status !== 200) {
      throw new Error(response.status);
    } else {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const GetSingleProducts = async (id) => {
  try {
    const response = await Api.get(`/${id}`);
    if (response.status !== 200) {
      throw new Error(response.status);
    } else {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};



// export const GetProductsFetch = async () => {
//   try {
//     const response = await fetch("https://fakestoreapi.com/products", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error(response.status);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };
