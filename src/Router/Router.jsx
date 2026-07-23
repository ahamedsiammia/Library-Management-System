import { createBrowserRouter } from "react-router";
import RoteLayout from "../Layout/RoteLayout";
import Home from "../Home/Home";
import Register from "../Register/Register";
import Login from "../Login/Login";
import About from "../About/About";
import Books from "../Books/Books";

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
             },
             {
                path :"/about",
                Component : About
             },
             {
               path : "/books",
               Component : Books
             }
        ]
    }
])