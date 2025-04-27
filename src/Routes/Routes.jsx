import { createBrowserRouter } from "react-router-dom";
import Root from "../Layouts/Root";
import Home from "../Pages/Home";
import AllFoods from "../Pages/AllFoods";
import MyOrders from "../Pages/MyOrders";
import FoodOrdersRequest from "../Pages/FoodOrdersRequest";
import MyFoods from "../Pages/MyFoods";
import AddFoods from "../Pages/AddFoods";
import FoodPurchase from "../Pages/FoodPurchase";
import SingleFood from "../Pages/SingleFood";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PrivateRoute from "./PrivateRoute";

const router=createBrowserRouter([
    {
        path:'/',
        element:<Root></Root>,
        children:[
            {
                index:true,
                element:<Home></Home>
            },
            {
                path:'/all-foods',
                element:<AllFoods></AllFoods>
            },
            {
                path:'/my-orders',
                element:<PrivateRoute><MyOrders></MyOrders></PrivateRoute>
            },
            {
                path:'/orders-request',
                element:<PrivateRoute><FoodOrdersRequest></FoodOrdersRequest></PrivateRoute>
            },
            {
                path:'/added-foods',
                element:<PrivateRoute><MyFoods></MyFoods></PrivateRoute>
            },
            {
                path:'/add-foods',
                element:<PrivateRoute><AddFoods></AddFoods></PrivateRoute>
            },
            {
                path:'/food-purchase',
                element:<PrivateRoute><FoodPurchase></FoodPurchase></PrivateRoute>
            },
            {
                path:'/single-food',
                element:<PrivateRoute><SingleFood></SingleFood></PrivateRoute>
            },
            {
                path:'/login',
                element:<Login></Login>,
            },
            {
                path:'/register',
                element:<Register></Register>
            }
        ]
    }
])

export default router;