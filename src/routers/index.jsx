import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/admin/login/Login";
import Register from "../pages/admin/register/Register";
import { adminRoutes } from "./admin.route";
import NotFound from "../components/NotFound";

export const router1= createBrowserRouter([
    {
        path:"/",
        element:<App></App>
    },
    adminRoutes,
     {
        path:"/login",
        element:<Login></Login>
    },
     {
        path:"/register",
        element:<Register></Register>
    },
    {
        path:"*",
        element:<NotFound></NotFound>
    }
])