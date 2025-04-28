import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";
import useAuth from "../Hooks/useAuth";
import { useEffect } from "react";
const Navbar = () => {
  const { user, logOut, theme, setTheme } = useAuth();
  useEffect(() => {
    const LTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", LTheme);
    setTheme(LTheme);
    // Set the toggle switch based on theme
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
      themeToggle.checked = LTheme === "night";
    }
  }, [theme]);

  const handleTheme = (e) => {
    if (e.target.checked) {
      // console.log(e.target.checked);
      setTheme("night");
      localStorage.setItem("theme", "night");
    } else {
      // console.log(e.target.checked);
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  };
  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      <div className="flex-1 flex items-center gap-3">
        <div className="flex gap-2 items-center">
          <img className="w-auto h-7" src={logo} alt="" />
          <span className="font-bold">QuickBasket</span>
        </div>

        <label className="toggle text-base-content">
          <input
            onChange={handleTheme}
            type="checkbox"
            value="synthwave"
            className="theme-controller"
            id="theme-toggle"
          />

          <svg
            aria-label="sun"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2"></path>
              <path d="M12 20v2"></path>
              <path d="m4.93 4.93 1.41 1.41"></path>
              <path d="m17.66 17.66 1.41 1.41"></path>
              <path d="M2 12h2"></path>
              <path d="M20 12h2"></path>
              <path d="m6.34 17.66-1.41 1.41"></path>
              <path d="m19.07 4.93-1.41 1.41"></path>
            </g>
          </svg>

          <svg
            aria-label="moon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </g>
          </svg>
        </label>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/all-foods"}>All Foods</NavLink>
          </li>

          {!user && (
            <li>
              <NavLink to={"/login"}>Login</NavLink>
            </li>
          )}
        </ul>

        {user && (
          <div className="dropdown dropdown-end z-50">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full" title="">
                <img
                  referrerPolicy="no-referrer"
                  alt="User Profile Photo"
                  src={user?.photoURL}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <NavLink to={`/add-foods`}>Add Foods</NavLink>
              </li>
              <li>
                <NavLink to={`/added-foods`}>My Added Foods</NavLink>
              </li>
              <li>
                <NavLink to={`/my-orders`}>My orders</NavLink>
              </li>
              <li>
                <NavLink to={`/orders-request`}>Orders Requests</NavLink>
              </li>
              <li className="mt-2">
                <button
                  onClick={logOut}
                  className="bg-gray-200 block text-center"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
