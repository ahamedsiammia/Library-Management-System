import { createBrowserRouter } from "react-router";
import RoteLayout from "../Layout/RoteLayout";
import Home from "../Home/Home";

export const router = createBrowserRouter([
    {
        path:"/",
        Component: RoteLayout,
        children:[
             {
                index: true ,
                 Component : Home
             }
        ]
    }
])