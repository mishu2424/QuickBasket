import React, { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import axios from "axios";
import { GoTrash } from "react-icons/go";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import toast from "react-hot-toast";

const FoodOrdersRequest = () => {
  const { user } = useAuth();
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    getData();
  }, [user?.email]);

  const handleStatus = async (id, orderStatus) => {
    const status = { orderStatus };
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/orders/status?id=${id}`,
        status
      );
      toast.success("Successfully updated the status");
      // ui refresh
      getData();
      console.log(data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const getData = async () => {
    const { data } = await axios(
      `${import.meta.env.VITE_API_URL}/orders-request?email=${user?.email}`
    );
    console.log(data);
    setFoods(data);
  };
  return (
    <section className="container px-4 mx-auto my-5">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">
          Total Orders
        </h2>
        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
          {foods.length} order
        </span>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    {/* 1 */}
                    <th className="py-3.5 px-4 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-x-3">
                        <span>Name</span>
                      </div>
                    </th>
                    {/* 2 */}
                    <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                      <button className="flex items-center gap-x-2">
                        <span>Food Name</span>
                        {/* Add SVG here if needed */}
                      </button>
                    </th>
                    {/* 3 */}
                    <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                      Email address
                    </th>
                    {/* 4 */}
                    <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                      Quantity
                    </th>
                    {/* 5 */}
                    <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                      Total
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                      Status
                    </th>
                    {/* 6 */}
                    <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                      Edit
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  {foods.map((food) => (
                    <tr key={food._id}>
                      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <div className="inline-flex items-center gap-x-3">
                          <div className="flex items-center gap-x-2">
                            <img
                              className="object-cover w-10 h-10 rounded-full"
                              src={food?.buyer?.buyer_photo}
                              alt=""
                            />
                            <div>
                              <h2 className="font-medium text-gray-800 dark:text-white">
                                {food?.buyer?.buyer_name}
                              </h2>
                              <p className="text-sm font-normal text-gray-600 dark:text-gray-400">
                                @{food?.buyer?.buyer_email.split("@")[0]}
                              </p>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        {food.food_name}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        {food.buyer.buyer_email}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        {food.quantity}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        ${food.total}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        <div
                          className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${
                            food?.status === "Pending" &&
                            " bg-yellow-100/60 text-yellow-500"
                          } ${
                            food?.status === "In progress" &&
                            " bg-blue-100/60 text-blue-500"
                          } ${
                            food?.status === "Completed" &&
                            " bg-green-100/60 text-green-500"
                          } ${
                            food?.status === "Cancelled" &&
                            " bg-red-100/60 text-red-500"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              food?.status === "Pending" && "bg-yellow-500"
                            } ${
                              food?.status === "In progress" && "bg-blue-500"
                            } ${
                              food?.status === "Completed" && "bg-green-500"
                            } ${food?.status === "Cancelled" && "bg-red-500"} `}
                          ></span>
                          <h2 className="text-sm font-normal">
                            {food?.status}
                          </h2>
                        </div>
                      </td>

                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-6">
                          <button
                            disabled={
                              food?.status === "Cancelled" ||
                              food?.status === "In progress"
                            }
                            onClick={() => handleStatus(food._id, "Cancelled")}
                            className="text-gray-500 cursor-pointer transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none"
                          >
                            {/* Trash icon */}
                            <GoTrash />
                          </button>
                          <button
                            disabled={
                              food?.status === "Cancelled" ||
                              food?.status === "In progress"
                            }
                            onClick={() =>
                              handleStatus(food._id, "In progress")
                            }
                            className="text-gray-500 cursor-pointer transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none"
                          >
                            <MdOutlineSystemUpdateAlt />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {/* Add more <tr> rows here for each user */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoodOrdersRequest;
