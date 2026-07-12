import { createBrowserRouter } from "react-router";
import RoteLayout from "../Layout/RoteLayout";
import Home from "../Home/Home";
import Register from "../Register/Register";
import Login from "../Login/Login";

export const router = createBrowserRouter([
    {
        path:"/",
        Component: RoteLayout,
        children:[
             {
                index: true ,
                 Component : Home
             },
             {
                path:"/register",
                Component : Register
             },
             {
                path:"/login",
                Component : Login
             }
        ]
    }
])