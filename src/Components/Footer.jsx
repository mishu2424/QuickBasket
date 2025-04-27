import React from "react";
import logo from "../assets/images/logo.png";
import { FaFacebook, FaGithub, FaReddit } from "react-icons/fa";
const Footer = () => {
  return (
    <div>
      <footer className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-8 mx-auto">
          <div className="flex flex-col items-center text-center">
            <a href="#">
              <img className="w-auto h-7" src={logo} alt="logo" />
            </a>

            <div className="flex flex-wrap justify-center mt-6 -mx-4">
              <a
                href="#"
                className="mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
                aria-label="Reddit"
              >
                Home
              </a>

              <a
                href="#"
                className="mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
                aria-label="Reddit"
              >
                About
              </a>

              <a
                href="#"
                className="mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
                aria-label="Reddit"
              >
                Teams
              </a>

              <a
                href="#"
                className="mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
                aria-label="Reddit"
              >
                Privacy
              </a>

              <a
                href="#"
                className="mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
                aria-label="Reddit"
              >
                Cookies
              </a>
            </div>
          </div>

          <hr className="my-6 border-gray-200 md:my-10 dark:border-gray-700" />

          <div className="flex flex-col items-center sm:flex-row sm:justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-300">
              © Copyright 2021. All Rights Reserved.
            </p>

            <div className="flex -mx-2">
              {/* Reddit Icon */}
              <a
                href="#"
                className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                aria-label="Reddit"
              >
                <FaReddit />
              </a>

              {/* Facebook Icon */}
              <a
                href="#"
                className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>

              {/* GitHub Icon */}
              <a
                href="#"
                className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                aria-label="Github"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
