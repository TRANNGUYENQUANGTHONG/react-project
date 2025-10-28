import AdminRoute from "../components/AdminRoute";
import AdminLayout from "../layouts/AdminLayout";
import DashBoard from "../pages/admin/dashboard/DashBoard";
import ProductsManager from "../pages/admin/manager_products/ProductsManager";
import UserManager from "../pages/admin/manager_users/UserManager";

export const adminRoutes ={
    path:"admin",
    element:<AdminRoute>
                <AdminLayout></AdminLayout>
        </AdminRoute>,
    children:[
        {index:1,element:<DashBoard></DashBoard>},
        {path:"users", element: <UserManager></UserManager>},
        {path:"products", element: <ProductsManager></ProductsManager>}

    ]
}