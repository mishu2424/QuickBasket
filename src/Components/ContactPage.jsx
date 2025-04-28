import React, { useState } from "react";
import useAuth from "../Hooks/useAuth";
import { SiFacebook } from "react-icons/si";
import { FaSquareInstagram, FaXTwitter } from "react-icons/fa6";
import axios from "axios";
import toast from "react-hot-toast";

const ContactPage = () => {
  const [sent, isSent] = useState(false);
  const { user } = useAuth();

  const handleContact = async (e) => {
    e.preventDefault();
    const form = e.target;

    const user_name = form.name.value;
    const user_email = form.email.value;
    const message = form.message.value;

    const contact = { user_name, user_email, message };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/contacts`,
        contact
      );
      if (data) {
        toast.success("Message has been sent!");
        isSent(true);
        e.target.reset();
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div className="my-10">
      <section
        className="min-h-screen bg-cover"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')",
        }}
      >
        <div className="flex flex-col min-h-screen bg-black/60">
          <div className="container flex flex-col flex-1 px-6 py-12 mx-auto">
            <div className="flex-1 lg:flex lg:items-center lg:-mx-6">
              <div className="text-white lg:w-1/2 lg:mx-6">
                <h1 className="text-2xl font-semibold capitalize lg:text-3xl">
                  Connect With Us for Exceptional Service
                </h1>

                <p className="max-w-xl mt-6 opacity-80">
                  Effortlessly streamline communication for optimal customer
                  experience. Continuously empower seamless inquiries via
                  intuitive form interfaces. Innovatively foster collaborative
                  engagements through efficient digital channels. Strategically
                  optimize responses for dynamic restaurant management
                  solutions.
                </p>

                <div className="mt-6 md:mt-8">
                  <h3 className="text-gray-300">Follow us</h3>

                  <div className="flex items-center gap-3 mt-4 ">
                    {/* Social icons */}
                    <SiFacebook />
                    <FaSquareInstagram />
                    <FaXTwitter />
                  </div>
                </div>
              </div>

              <div className="mt-8 lg:w-1/2 lg:mx-6">
                <div className="w-full px-8 py-10 mx-auto overflow-hidden bg-white shadow-2xl rounded-xl dark:bg-gray-900 lg:max-w-xl">
                  <h1 className="text-xl font-medium text-gray-700 dark:text-gray-200">
                    Contact form
                  </h1>

                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Ask us everything and we would love to hear from you
                  </p>

                  <form className="mt-6" onSubmit={handleContact}>
                    <div className="flex-1">
                      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder={user?.displayName || "John Doe"}
                        className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                      />
                    </div>

                    <div className="flex-1 mt-6">
                      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        Email address
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder={user?.email || "johndoe@example.com"}
                        className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                      />
                    </div>

                    <div className="w-full mt-6">
                      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        Message
                      </label>
                      <textarea
                        name="message"
                        className="block w-full h-32 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:h-48 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                        placeholder="Message"
                      ></textarea>
                    </div>

                    <button disabled={sent} className="w-full px-6 py-3 mt-6 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-50 cursor-pointer">
                      {sent ? "Sent!" : "get in touch"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
