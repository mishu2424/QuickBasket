import React, { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import FoodCard from "../Components/FoodCard";

const AllFoods = () => {
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [category, setCategory] = useState("");
  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState("");
  const axiosSecure = useAxiosSecure();

  const getData = async () => {
    const { data } = await axiosSecure(
      `/all-foods?page=${currentPage}&limit=${itemsPerPage}&category=${category}&search=${searchText}&sort=${sort}`
    );
    // console.log(data);
    return data;
  };

  const { data: foods = [] } = useQuery({
    queryKey: ["all-foods", currentPage, category, searchText, sort],
    queryFn: getData,
  });

  useEffect(() => {
    const getCount = async () => {
      const { data } = await axiosSecure(
        `/all-foods-count?category=${category}&search=${searchText}`
      );
      // console.log(data.count);
      setCount(data.count);
    };

    getCount();
  }, [category, searchText]);
  // console.log(count);

  const handleCategoryChange = (e) => {
    // console.log(e.target.value);
    setCurrentPage(1);
    setCategory(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchText(e.target.search.value);
    setCurrentPage(1);
    e.target.reset();
  };

  const handleSort = (e) => {
    console.log(e.target.value);
    setSort(e.target.value);
  };

  const totalPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(totalPages).keys()].map((element) => element + 1);
  return (
    <div>
      <section className="container mx-auto px-4 py-6">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          <div className="flex flex-col md:flex-row flex-wrap gap-4 items-center justify-between">
            {/* Category Filter */}
            <div className="flex-1 min-w-[200px]">
              <select
                name="category"
                value={category}
                onChange={handleCategoryChange}
                className="select border border-gray-300 text-gray-700 bg-white dark:bg-gray-900 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Filter by Category</option>
                <option value="Fruits">Fruits</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Dairy">Dairy</option>
                <option value="Others">Others</option>
              </select>
            </div>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 min-w-[200px]">
              <div className="flex justify-between border border-gray-300 rounded-lg overflow-hidden focus-within:ring focus-within:ring-blue-300">
                <div className="flex items-center gap-2">
                  <svg
                    className="h-[1em] opacity-50 text-base pl-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </g>
                  </svg>
                  <input
                    onChange={(e) => {
                      setSearchText(e.target.value);
                      setCurrentPage(1);
                    }}
                    defaultValue={searchText && searchText}
                    type="text"
                    name="search"
                    placeholder="Search by Job Title"
                    className="  text-gray-700 bg-white dark:bg-gray-900 dark:text-gray-200 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="btn bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Sort By */}
            <div className="flex-1 min-w-[200px]">
              <select
                value={sort}
                name="sort"
                onChange={(e) => handleSort(e)}
                className="select border border-gray-300 text-gray-700 bg-white dark:bg-gray-900 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Sort by Order Count</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            {/* Reset */}
            <div className="flex-1 min-w-[150px] text-center">
              <button
                onClick={() => {
                  setCurrentPage(1);
                  setCategory("");
                  setSearchText("");
                  setSort("");
                }}
                className="w-full px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Reset
              </button>
            </div>
            <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {foods.map((food) => (
                <FoodCard key={food._id} food={food} />
              ))}
            </div>
          </div>
          {!foods.length && (
            <div>
              <span>No match!!!</span>
            </div>
          )}
        </div>
        <div className="flex justify-center mt-12">
          <button
            onClick={() => {
              if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
              }
            }}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500  hover:text-white"
          >
            <div className="flex items-center -mx-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-1 rtl:-scale-x-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>

              <span className="mx-1">previous</span>
            </div>
          </button>

          {pages.map((btnNum) => (
            <button
              key={btnNum}
              onClick={() => setCurrentPage(btnNum)}
              className={`hidden px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-blue-500  hover:text-white ${
                currentPage === btnNum && "bg-blue-500 text-white"
              }`}
            >
              {btnNum}
            </button>
          ))}

          <button
            onClick={() => {
              if (currentPage <= totalPages) {
                setCurrentPage(currentPage + 1);
              }
            }}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500"
          >
            <div className="flex items-center -mx-1">
              <span className="mx-1">Next</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-1 rtl:-scale-x-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </button>
        </div>
      </section>
    </div>
  );
};

export default AllFoods;
