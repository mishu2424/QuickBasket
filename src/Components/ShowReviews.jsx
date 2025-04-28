import React, { useEffect, useState } from "react";
import "../styles/ShowReviews.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const CustomLeftArrow = ({ onClick, hovered }) => (
  <button
    onClick={onClick}
    className={`
        absolute bottom-35 right-[45%] transform -translate-y-1/2 
        bg-white text-blue-600  p-2 rounded-full z-10 
        transition-all duration-500 ease-in-out cursor-pointer
        ${hovered ? "right-10 opacity-100" : "-right-20 opacity-0"}
      `}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  </button>
);

const CustomRightArrow = ({ onClick, hovered }) => (
  <button
    onClick={onClick}
    className={`
        absolute bottom-35 right-[40%] transform -translate-y-1/2 
        bg-white text-blue-600 p-2 rounded-full z-10 
        transition-all duration-500 ease-in-out cursor-pointer
        ${hovered ? "right-4 opacity-100" : "-right-20 opacity-0"}
      `}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  </button>
);

// const CustomLeftArrow = ({ onClick, hovered }) => (
//   <button
//     onClick={onClick}
//     className={`
//         absolute top-1/2 transform -translate-y-1/2
//         bg-blue-600 text-white p-2 rounded-full z-10
//         transition-all duration-500 ease-in-out cursor-pointer
//         ${hovered ? "left-4 opacity-100" : "-left-12 opacity-0"}
//       `}
//   >
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       className="w-6 h-6"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M15 19l-7-7 7-7"
//       />
//     </svg>
//   </button>
// );

// const CustomRightArrow = ({ onClick, hovered }) => (
//   <button
//     onClick={onClick}
//     className={`
//         absolute top-1/2 transform -translate-y-1/2
//         bg-blue-600 text-white p-2 rounded-full z-10
//         transition-all duration-500 ease-in-out
//         ${hovered ? "right-4 opacity-100" : "-right-12 opacity-0"}
//       `}
//   >
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       className="w-6 h-6"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M9 5l7 7-7 7"
//       />
//     </svg>
//   </button>
// );

const ShowReviews = () => {
  // const [reviews, setReviews] = useState([]);
  const [hovered, setHovered] = useState(false);

  const getData = async () => {
    const { data } = await axios(`${import.meta.env.VITE_API_URL}/reviews`);
    // setReviews(data);
    return data;
  };

  // useEffect(() => {
  //   getData();
  // }, []);

  const {
    data: reviews = [],
    isError,
    refetch,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: getData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  return (
    <div
      className="relative container mx-auto"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Carousel
        additionalTransfrom={0}
        centerMode={false}
        arrows
        customLeftArrow={<CustomLeftArrow hovered={hovered} />}
        customRightArrow={<CustomRightArrow hovered={hovered} />}
        autoPlay
        autoPlaySpeed={7000}
        containerClass="container"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite={false}
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 1,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 1,
          },
        }}
        rewind
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {reviews.map((review) => (
          <section className="bg-white dark:bg-gray-900">
            <div className="max-w-6xl px-6 py-10 mx-auto">
              <p className="text-xl font-medium text-blue-500">Reviews</p>

              <h1 className="mt-2 text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
                What clients are saying
              </h1>

              <main className="relative z-20 w-full mt-8 md:flex md:items-center xl:mt-12">
                <div className="absolute w-full bg-blue-600 -z-10 md:h-96 rounded-2xl"></div>

                <div className="w-full p-6 bg-blue-600 md:flex md:items-center rounded-2xl md:bg-transparent md:p-0 lg:px-12 md:justify-evenly">
                  <img
                    className="h-24 w-24 md:mx-6 rounded-full object-cover shadow-md md:h-[32rem] md:w-80 lg:h-[36rem] lg:w-[26rem] md:rounded-2xl"
                    src={review?.user_photo}
                    alt="client photo"
                  />

                  <div className="mt-2 md:mx-6 p-10">
                    <div>
                      <p className="text-xl font-medium tracking-tight text-white">
                        {review?.user_name}
                      </p>
                      <p className="text-blue-200">{review?.user_email}</p>
                    </div>

                    <p className="mt-4 text-lg leading-relaxed text-white md:text-xl">
                      “{review?.message.substring(0, 200)}”.
                    </p>

                    {/* <div className="flex items-center justify-between mt-6 md:justify-start">
                  <button
                    title="left arrow"
                    className="p-2 text-white transition-colors duration-300 border rounded-full rtl:-scale-x-100 hover:bg-blue-400"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
      
                  <button
                    title="right arrow"
                    className="p-2 text-white transition-colors duration-300 border rounded-full rtl:-scale-x-100 md:mx-6 hover:bg-blue-400"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div> */}
                  </div>
                </div>
              </main>
            </div>
          </section>
        ))}
      </Carousel>
    </div>
  );
};

export default ShowReviews;
