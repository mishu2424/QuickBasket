import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import DatePicker from "react-datepicker";
import { IoCalendarNumber } from "react-icons/io5";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const FoodPurchase = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [startDate, setStartDate] = useState(new Date());
  // console.log(id);
  const [food, setFood] = useState({});
  useEffect(() => {
    getData();
  }, [id]);


  const handleOrder = async (e, id) => {
    e.preventDefault();
    const form = e.target;
    const buyer = {
      buyer_email: form.email.value,
      buyer_name: form.name.value,
      buyer_photo: user?.photoURL,
    };
    const comment = form.comment.value;
    const quantity = parseInt(form.quantity.value);
    const buying_time = startDate.toLocaleString();
    const status = "Pending";
    const food_id = id;
    const food_name = food.food_name;
    const food_category = food.food_category;
    const total=parseFloat((quantity*food.price).toFixed(2));
    const supplier_email=food?.buyer?.buyer_email;
    if(user?.email===food.buyer.buyer_email){
      return toast.error('Action not permitted!')
    }
    if (food.quantity < quantity) {
      return toast.error(
        "Orders quantity has to be equal or less than the quantity available."
      );
    }
    const order = {
      food_id,
      food_name,
      quantity,
      food_category,
      total,
      comment,
      buying_time,
      buyer,
      status,
      supplier_email
    };
    console.log(order);
    Swal.fire({
      title: "Are you sure to purchase it?",
      text: `Total: ${(quantity * food.price).toFixed(2)}`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, purchase it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axios.post(
            `${import.meta.env.VITE_API_URL}/orders`,
            order
          );
          if (data.insertedId) {
            Swal.fire({
              title: "Purchased!",
              icon: "success",
            });
            // optimistic ui refresh
            getData();
          }
        } catch (err) {
          toast.error(err.message);
        }
      }
    });
  };
  const getData = async () => {
    const { data } = await axios(`${import.meta.env.VITE_API_URL}/foods/${id}`);
    setFood(data);
    console.log(data);
  };
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-5">
        <section className="bg-white dark:bg-gray-900 shadow-md p-10">
          <div className="">
            <p className="text-sm text-blue-500 uppercase">
              {food.food_category}
            </p>

            <a
              href="#"
              className="block mt-4 text-2xl font-semibold text-gray-800 hover:underline dark:text-white"
            >
              {food.food_name}
            </a>

            <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
              {food.description}
            </p>

            <span className="text-sm">Quantity: {food.quantity}</span>
            {food?.quantity===0 && <span className="text-xs text-rose-500 bg-red-100/50 rounded-full px-2 py-1 ml-2">Not available</span>}
            <div className="flex items-center mt-6">
              <img
                className="object-cover object-center w-10 h-10 rounded-full"
                src={food?.buyer?.buyer_photo}
                alt=""
              />

              <div className="mx-4">
                <h1 className="text-sm text-gray-700 dark:text-gray-200">
                  {food?.buyer?.buyer_name}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {food?.buyer?.buyer_email}
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white dark:bg-gray-900 shadow-md p-10">
          <div className="">
            <form onSubmit={(e) => handleOrder(e, food._id)}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 my-2.5">
                <div>
                  <label>Quantity:</label>
                  <input
                    name="quantity"
                    type="text"
                    className="input input-bordered"
                  />
                </div>
                <div>
                  <label>Buyer Name:</label>
                  <input
                    readOnly
                    name="name"
                    type="text"
                    className="input input-bordered"
                    defaultValue={user?.displayName}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <div>
                  <label>Buyer Email:</label>
                  <input
                    readOnly
                    name="email"
                    type="text"
                    className="input input-bordered"
                    defaultValue={user?.email}
                  />
                </div>
                <div>
                  <label>Buying Date:</label>
                  <div className="border border-gray-200 p-2 rounded-lg flex items-center justify-between">
                    <DatePicker
                      readOnly
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      showTimeSelect
                      dateFormat="Pp"
                    />
                    <IoCalendarNumber />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="text-gray-700 " htmlFor="comment">
                    Comment
                  </label>
                  <textarea
                    required
                    name="comment"
                    id="comment"
                    rows="4"
                    className="block w-full px-4 py-2 mt-2 border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  ></textarea>
                </div>
              </div>
              <input
                disabled={food?.quantity===0}
                type="submit"
                value={"Purchase"}
                className="btn w-full mt-3 bg-blue-500 text-white"
              />
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FoodPurchase;
