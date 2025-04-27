import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";
import useAuth from "../Hooks/useAuth";
const Navbar = () => {
  const { user,logOut } = useAuth();
  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      <div className="flex-1">
        <div className="flex gap-2 items-center">
          <img className="w-auto h-7" src={logo} alt="" />
          <span className="font-bold">QuickBasket</span>
        </div>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/all-foods"}>All Foods</NavLink>
          </li>

          {!user && <li>
            <NavLink to={"/login"}>Login</NavLink>
          </li>}
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
                <button onClick={logOut} className="bg-gray-200 block text-center">
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
