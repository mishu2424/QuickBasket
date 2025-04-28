import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Root = () => {
  return (
    <div className="font-jost">
      <Navbar></Navbar>
      <div className="min-h-[calc(100vh-314px)]">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Root;
