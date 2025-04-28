import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const PopularFoods = () => {
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/foods/popular`
      );
      console.log(data);
      setFoods(data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="container mx-auto mt-20">
      <h1 className="text-2xl font-extrabold">Popular Items</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-3">
        {foods.map((food) => (
          <div
            key={food._id}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-4">
              {/* Buyer Details */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={food.buyer?.buyer_photo}
                  alt={food.buyer?.buyer_name}
                />
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">
                    {food.buyer?.buyer_name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {food.buyer?.buyer_email}
                  </p>
                </div>
              </div>

              {/* Food Details */}
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {food.food_name}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Category:{" "}
                <span className="font-medium">{food.food_category}</span>
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {food.description}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300">
                <p>
                  Ordered:{" "}
                  <span className="font-medium">{food.orderedCount}</span> times
                </p>
                <p>
                  Available:{" "}
                  <span className="font-medium">{food.quantity}</span>
                </p>
              </div>

              {/* Price and Last Updated */}
              <div className="flex justify-between items-center mt-8">
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  ${food.price}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Updated: {food.updatedAt}
                </p>
              </div>
            </div>

            {/* Image Now Below */}
            {/* <img
              className="w-full h-64 object-cover"
              src={food.food_image}
              alt={food.food_name}
            /> */}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center my-3">
      <Link to={`/all-foods`}>
      <button className="btn bg-violet-600 text-white px-10">See More</button></Link>
      </div>
    </div>
  );
};

export default PopularFoods;
