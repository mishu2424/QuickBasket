import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const Slide = ({ text, title, img }) => {
  const{theme}=useAuth();
  return (
    <>
      <div className="container flex flex-col px-6 py-4 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:items-center gap-5">
        <div className="flex flex-col items-center w-full lg:flex-row lg:w-1/2 lg:translate-x-15">
          <div className="max-w-lg lg:mx-12 lg:order-2 text-center">
            <h1 className={`text-3xl font-semibold tracking-wide text-gray-800 dark:text-white lg:text-4xl ${theme==='night' && 'text-white'}`}>
              {title}
            </h1>
            <p className={`mt-4 text-gray-600 dark:text-gray-300 ${theme==='night' && 'text-white'}`}>{text}</p>
            <div className="mt-6">
              <Link
                to={`/all-foods`}
                className="px-6 py-2.5 mt-6 text-sm font-medium leading-5 text-center text-white capitalize bg-blue-600 rounded-lg border lg:mx-0 lg:w-auto focus:outline-none hover:text-blue-500 hover:border-blue-500 hover:bg-white duration-300"
              >
                Explore more foods
              </Link>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center w-full h-96 lg:w-1/2">
          <Lottie className="h-80" animationData={img} loop={true}></Lottie>
          {/* <img className="object-cover w-full h-full max-w-2xl rounded-md" src="https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80" alt="apple watch photo"/> */}
        </div>
      </div>
    </>
  );
};

export default Slide;
