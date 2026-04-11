import { createBrowserRouter } from "react-router";
import RoteLayout from "../Layout/RoteLayout";

export const router = createBrowserRouter([
    {
        path:"/",
        Component: RoteLayout,
        children:[
             
        ]
    }
])