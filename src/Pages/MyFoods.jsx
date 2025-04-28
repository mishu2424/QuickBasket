import React, { useEffect, useRef, useState } from "react";
import useAuth from "../Hooks/useAuth";
import axios from "axios";
import { GoTrash } from "react-icons/go";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IoPencilOutline } from "react-icons/io5";

const MyFoods = () => {
  const { user } = useAuth();
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null); // selected food for modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dialogRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [user?.email]);

  const handleDelete = async (id) => {
    // console.log(id);
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/foods/${id}`);
      getData();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const getData = async () => {
    const { data } = await axios(
      `${import.meta.env.VITE_API_URL}/foods?email=${user?.email}`
    );
    console.log(data);
    setFoods(data);
  };

  const handleEditClick = (food) => {
    console.log("clicked");
    setSelectedFood(food);
    console.log(selectedFood);
    setIsModalOpen(true);
    setTimeout(() => {
      dialogRef.current?.showModal();
    }, 0);
  };

  const closeModal = () => {
    dialogRef.current?.close();
    setIsModalOpen(false);
    setSelectedFood(null);
  };

  const handleUpdateGrocery = async (e, id) => {
    e.preventDefault();
    const form = e.target;

    const food_name = form.food_name.value;
    const food_image = form.food_image.value;
    const food_category = form.food_category.value;
    const quantity = parseInt(form.quantity.value);
    const price = parseFloat(form.price.value);
    const description = form.description.value;
    const email = user?.email;

    const buyer = {
      buyer_email: email,
      buyer_name: user?.displayName,
      buyer_photo: user?.photoURL,
    };

    const groceryData = {
      food_name,
      food_image,
      food_category,
      quantity,
      price,
      description,
      buyer,
    };
    console.log(id, groceryData);

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/foods/update/${id}`,
        groceryData
      );
      toast.success("Grocery Item Added Successfully!");

      // ui refresh
      getData();
      setSelectedFood(null);
      navigate("/added-foods");
      closeModal();
      //   navigate("/my-groceries");
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <section className="container px-4 mx-auto my-5">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">
          Total foods
        </h2>
        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
          {foods.length}
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
                      Price
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
                        ${food.price}
                      </td>

                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-6">
                          <button
                            onClick={() => handleDelete(food._id)}
                            disabled={food.quantity !== 0}
                            className="text-gray-500 cursor-pointer transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none"
                          >
                            {/* Trash icon */}
                            <GoTrash />
                          </button>
                          <Link to={`/foods/update/${food._id}`}>
                            <button className="text-gray-500 cursor-pointer transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none">
                              {/* Pencil icon */}
                              <HiOutlinePencilSquare />
                            </button>
                          </Link>

                          {/* Update Modal */}
                          <button
                            onClick={() => {
                              handleEditClick(food);
                              document
                                .getElementById(`my_modal_${food._id}`)
                                .showModal();
                            }}
                            className="text-gray-500 cursor-pointer transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none"
                          >
                            {/* Pencil icon */}
                            <IoPencilOutline />
                          </button>

                          {/* one way */}
                          {selectedFood && (
                            <dialog ref={dialogRef} className="modal">
                              <div className="modal-box container">
                                <form method="dialog">
                                  {/* if there is a button in form, it will close the modal */}
                                  <button
                                    onClick={closeModal}
                                    className="btn btn-sm btn-circle btn-ghost bg-red-500 p-2 rounded-full w-10 h-10 cursor-pointer text-white absolute right-0 top-0"
                                  >
                                    ✕
                                  </button>
                                </form>
                                <section className="p-6 mx-auto bg-white rounded-md shadow-md">
                                  <h2 className="text-lg font-semibold text-gray-700 capitalize">
                                    Update Grocery Item
                                  </h2>

                                  <form
                                    onSubmit={(e) =>
                                      handleUpdateGrocery(e, selectedFood?._id)
                                    }
                                  >
                                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                                      <div>
                                        <label
                                          className="text-gray-700"
                                          htmlFor="food_name"
                                        >
                                          Food Name
                                        </label>
                                        <input
                                          required
                                          defaultValue={selectedFood?.food_name}
                                          id="food_name"
                                          name="food_name"
                                          type="text"
                                          className="block w-full px-4 py-2 mt-2 border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                        />
                                      </div>

                                      <div>
                                        <label
                                          className="text-gray-700"
                                          htmlFor="food_image"
                                        >
                                          Image URL
                                        </label>
                                        <input
                                          required
                                          defaultValue={
                                            selectedFood?.food_image
                                          }
                                          id="food_image"
                                          name="food_image"
                                          type="text"
                                          className="block w-full px-4 py-2 mt-2 border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                        />
                                      </div>

                                      {selectedFood?.food_category && (
                                        <div>
                                          <label
                                            className="text-gray-700"
                                            htmlFor="food_category"
                                          >
                                            Category
                                          </label>
                                          <select
                                            required
                                            defaultValue={
                                              selectedFood?.food_category
                                            }
                                            name="food_category"
                                            id="food_category"
                                            className="block w-full px-4 py-2 mt-2 border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                          >
                                            <option value="Fruits">
                                              Fruits
                                            </option>
                                            <option value="Vegetables">
                                              Vegetables
                                            </option>
                                            <option value="Dairy">Dairy</option>
                                            <option value="Others">
                                              Others
                                            </option>
                                          </select>
                                        </div>
                                      )}

                                      <div>
                                        <label
                                          className="text-gray-700"
                                          htmlFor="quantity"
                                        >
                                          Quantity
                                        </label>
                                        <input
                                          defaultValue={selectedFood?.quantity}
                                          required
                                          id="quantity"
                                          name="quantity"
                                          type="number"
                                          min="1"
                                          step="1"
                                          className="block w-full px-4 py-2 mt-2 border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                        />
                                      </div>

                                      <div>
                                        <label
                                          className="text-gray-700"
                                          htmlFor="price"
                                        >
                                          Price ($)
                                        </label>
                                        <input
                                          defaultValue={selectedFood?.price}
                                          required
                                          id="price"
                                          name="price"
                                          type="text"
                                          className="block w-full px-4 py-2 mt-2 border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                        />
                                      </div>

                                      <div>
                                        <label
                                          className="text-gray-700"
                                          htmlFor="email"
                                        >
                                          Buyer Email
                                        </label>
                                        <input
                                          readOnly
                                          id="email"
                                          name="email"
                                          type="email"
                                          defaultValue={
                                            selectedFood?.buyer?.buyer_email
                                          }
                                          disabled
                                          className="block w-full px-4 py-2 mt-2 bg-gray-100 border border-gray-200 rounded-md"
                                        />
                                      </div>
                                    </div>

                                    <div className="mt-4">
                                      <label
                                        className="text-gray-700"
                                        htmlFor="description"
                                      >
                                        Description
                                      </label>
                                      <textarea
                                        defaultValue={selectedFood?.description}
                                        required
                                        name="description"
                                        id="description"
                                        rows="4"
                                        className="block w-full px-4 py-2 mt-2 border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                      ></textarea>
                                    </div>

                                    <div className="flex justify-end mt-6">
                                      <button
                                        type="submit"
                                        className="px-8 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                      >
                                        Update Item
                                      </button>
                                    </div>
                                  </form>
                                </section>
                              </div>
                            </dialog>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}

                  {/* another way to do it */}
                  {/* {isModalOpen && selectedFood && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-400 bg-opacity-40">
                              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-11/12 md:w-2/3 p-6 relative">
                                <button
                                  onClick={closeModal}
                                  className="absolute bg-red-500 p-2 top-2 right-2 text-white rounded-full w-10 h-10 cursor-pointer dark:text-gray-300"
                                >
                                  ✕
                                </button>
                                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                                  Edit: {selectedFood.food_name}
                                </h2>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                  Quantity: {selectedFood.quantity}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                  Price: ${selectedFood.price}
                                </p>
                              </div>
                            </div>
                          )} */}

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

export default MyFoods;
