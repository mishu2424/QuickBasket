import React from "react";

const AllFoods = () => {
  return (
    <div>
      <section className="container mx-auto px-4 py-6">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          <div className="flex flex-col md:flex-row flex-wrap gap-4 items-center justify-between">
            {/* Category Filter */}
            <div className="flex-1 min-w-[200px]">
              <select
                name="category"
                //   onChange={onCategoryChange}
                className="select border border-gray-300 text-gray-700 bg-white dark:bg-gray-900 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Filter by Category</option>
                <option value="Web Development">Web Development</option>
                <option value="Graphics Design">Graphics Design</option>
                <option value="Digital Marketing">Digital Marketing</option>
              </select>
            </div>

            {/* Search */}
            <form
              //   onSubmit={onSearch}
              className="flex-1 min-w-[200px]"
            >
              <div className="flex border border-gray-300 rounded-lg overflow-hidden focus-within:ring focus-within:ring-blue-300">
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
                name="sort"
                //   onChange={onSortChange}
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
                //   onClick={onReset}
                className="w-full px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllFoods;
