import React, { useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../Hooks/useAuth";
import { Link } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Review = () => {
  const [sent, isSent] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient=useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async ({ review }) => {
      try {
        await axiosSecure.post(`/reviews`, review);
      } catch (err) {
        toast.error(err.message);
      }
    },
    onSuccess: () => {
      toast.success("Message has been sent!");
      isSent(true);
      queryClient.invalidateQueries({queryKey:['reviews']})
    },
  });

  const handleReview = async (e) => {
    e.preventDefault();
    const form = e.target;

    const user_name = form.name.value;
    const user_email = form.email.value;
    const user_photo = form.photo.value;
    const message = form.review.value;

    const review = { user_name, user_email, user_photo, message };
    console.log(review);

    await mutateAsync({ review });
    e.target.reset();
  };
  return (
    <section className="flex items-center flex-1 my-10 container mx-auto">
      <div className="flex flex-col w-full space-y-5">
        <h1 className="text-5xl font-extrabold text-center lg:text-7xl 2xl:text-8xl">
          <span className="text-transparent bg-gradient-to-br bg-clip-text from-teal-500 via-indigo-500 to-sky-500 dark:from-teal-200 dark:via-indigo-300 dark:to-sky-500">
            Send us a
          </span>

          <span className="pl-3 text-transparent bg-gradient-to-tr bg-clip-text from-blue-500 via-pink-500 to-red-500 dark:from-sky-300 dark:via-pink-300 dark:to-red-500">
            nice review
          </span>
        </h1>
        <Link to={`'/login`}>
          <h3 className="text-xl font-normal text-blue-400 link-hover cursor-pointer">
            Sign in before Review
          </h3>
        </Link>
        <form onSubmit={handleReview}>
          <div className="grid grid-cols-1 lg:grid-cols-2 ">
            <input
              required
              readOnly
              id="name"
              type="text"
              name="name"
              className="px-6 py-3 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring sm:mx-2"
              defaultValue={user?.displayName}
            />
            <input
              required
              readOnly
              id="photo"
              type="url"
              name="photo"
              className="px-6 py-3 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring sm:mx-2"
              defaultValue={user?.photoURL}
            />
          </div>
          <textarea
            required
            name="review"
            placeholder="Review"
            className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
          ></textarea>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 mt-3">
            <input
              required
              readOnly
              id="email"
              type="email"
              name="email"
              className="px-6 py-3 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring sm:mx-2"
              defaultValue={user?.email}
            />
            <button
              disabled={sent}
              className="px-6 py-3 w-full  text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:bg-blue-600 focus:outline-none "
            >
              {sent ? "Sent!" : "Send"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Review;
