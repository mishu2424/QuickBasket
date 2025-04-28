import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const SingleFood = () => {
  const { id } = useParams();
  // console.log(id);
  const [food, setFood] = useState({});
  useEffect(() => {
    getData();
  }, [id]);

  const getData = async () => {
    const { data } = await axios(`${import.meta.env.VITE_API_URL}/foods/${id}`);
    setFood(data);
    console.log(data);
  };
  return (
    <div className="flex flex-col container mx-auto p-6 space-y-6 overflow-hidden rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        <img
          alt=""
          src={food?.buyer?.buyer_photo}
          className="object-cover w-12 h-12 rounded-full shadow bg-gray-500"
        />
        <div className="flex flex-col space-y-1">
          <a
            rel="noopener noreferrer"
            href="#"
            className="text-sm font-semibold"
          >
            {food?.buyer?.buyer_name}
          </a>
        </div>
      </div>
      <div>
        <img
          src={food.food_image}
          alt=""
          className="object-cover w-full mb-4 sm:h-96 lg:h-[500px] bg-gray-500"
        />
        <h2 className="mb-1 text-xl font-semibold">
          {food.food_name}
        </h2>
        <p className="text-sm text-gray-400">
          {food.description}
        </p>
      </div>
      <Link to={`/foods-purchase/${food._id}`}><button className="btn w-full bg-purple-400 text-white">Purchase</button></Link>
    </div>
  );
};

export default SingleFood;
