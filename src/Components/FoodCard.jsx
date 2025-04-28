import React from "react";
import { Link } from "react-router-dom";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
const FoodCard = ({ food }) => {
  const { _id, food_name, food_image, description, price, food_category } =
    food;
  return (
    <>
      {/* <Link to={`/foods/${_id}`}> */}
        <div
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Click to see details"
          data-tooltip-place="top"
          className="max-w-xs overflow-hidden relative bg-white rounded-lg shadow-lg dark:bg-gray-800 h-[328px] cursor-pointer hover:scale-105 duration-300"
        >
          <span
            className={`absolute top-20 right-2 px-3 py-1 text-xs ${
              food_category === "Fruits" &&
              "text-blue-800 bg-blue-200 dark:bg-blue-300 dark:text-blue-900"
            } ${
              food_category !== "Vegetables" &&
              food_category !== "Fruits" &&
              !food_category.includes("Dairy") &&
              "text-pink-800 bg-pink-100"
            } ${
              food_category === "Vegetables" &&
              "text-emerald-800 bg-emerald-100"
            } ${
              food_category.includes("Dairy") && "text-amber-600 bg-amber-100"
            } uppercase rounded-full text-end`}
          >
            {food_category}
          </span>
          <div className="px-4 py-2">
            <h1 className="text-base font-bold text-gray-800 uppercase dark:text-white">
              {food_name}
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {description}
            </p>
          </div>

          <img
            className="object-cover w-full h-48 mt-2"
            src={food_image}
            alt="NIKE AIR"
          />

          <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
            <h1 className="text-lg font-bold text-white">${price}</h1>
            <Link to={`/foods-purchase/${_id}`}>
              <button className="px-2 cursor-pointer py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">
                Details
              </button>
            </Link>
          </div>
        </div>
      {/* </Link> */}
      <Tooltip
        id="my-tooltip"
        style={{ backgroundColor: "gray", color: "white" }}
      />
    </>
  );
};

export default FoodCard;
