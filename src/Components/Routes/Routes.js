import { createBrowserRouter } from "react-router-dom";
import Home from "../Home";
import Main from "../Layouts/Main";
import Login from "../LogUser/Login";
import Register from "../LogUser/Register";
import Category from "../Pages/Category";
import SeeDetails from "../Pages/SeeDetails";
import Test from "../test/Test";
import PrivateRoutes from './../Advanced/PrivateRoutes';
import AdminRoute from './../Advanced/AdminBuyerSeller/AdminRoute';
import AdminSeller from './../Advanced/AdminBuyerSeller/AdminSeller';
import AdminBuyer from './../Advanced/AdminBuyerSeller/AdminBuyer';
import SellerPrivateRoute from './../Advanced/AdminBuyerSeller/SellerPrivateRoute';
import MyProducts from './../Advanced/AdminBuyerSeller/MyProducts';
import DashBoardLayout from './../Advanced/AdminBuyerSeller/DashBoardLayout';
import DashBoardHome from './../Advanced/AdminBuyerSeller/DashBoardHome';
import SellerProductAdded from "../Advanced/AdminBuyerSeller/SellerProductAdded";
import Buyer from "../Advanced/AdminBuyerSeller/Buyer";
import BuyerPrivate from './../Advanced/AdminBuyerSeller/BuyerPrivate';
import Admin from "../Advanced/AdminBuyerSeller/Admin";


const routes = createBrowserRouter(
    [
        {
            path: '/',
            element: <Main></Main>,
            children: [
                {
                    path: '/',
                    element: <Home></Home>
                },
                {
                    path: '/login',
                    element: <Login></Login>
                },
                {
                    path: '/register',
                    element: <Register></Register>
                },
                {
                    path: '/category/:name',
                    element: <Category></Category>,
                    loader: ({ params }) => fetch(`http://localhost:5000/category/${params.name}`)
                },
                {
                    path: '/details/:id',
                    element: <SeeDetails></SeeDetails>,
                    loader: ({ params }) => fetch(`http://localhost:5000/details/${params.id}`)
                },
                {
                    path: '/test',
                    element: <Test></Test>
                },
                // Buyer Part
                {
                    path: '/dashboard/buyer',
                    element: <BuyerPrivate><Buyer></Buyer></BuyerPrivate>
                },
                // Admin Part
                {
                    path: '/dashboard/allusers',
                    element: <AdminRoute><Admin></Admin></AdminRoute>
                },
                {
                    path: '/dashboard/allsellers',
                    element: <AdminRoute><AdminSeller></AdminSeller></AdminRoute>,
                },
                {
                    path: '/dashboard/allbuyers',
                    element: <AdminRoute><AdminBuyer></AdminBuyer></AdminRoute>,
                },
                // Seller Part
                {
                    path: '/dashboard/seller',
                    element: <SellerPrivateRoute><MyProducts></MyProducts></SellerPrivateRoute>
                },
                {
                    path: '/dashboard/addproduct',
                    element: <SellerPrivateRoute><SellerProductAdded></SellerProductAdded></SellerPrivateRoute>
                },
            ]

        },
        {
            path: '/dashboard',
            element: <PrivateRoutes><DashBoardLayout></DashBoardLayout></PrivateRoutes>,
            children: [
                {
                    path: '/dashboard',
                    element: <DashBoardHome></DashBoardHome>
                },
                // Admin Part
                // {
                //     path: '/dashboard/allusers',
                //     element: <AdminRoute><Admin></Admin></AdminRoute>
                // },
                // {
                //     path: '/dashboard/allsellers',
                //     element: <AdminRoute><AdminSeller></AdminSeller></AdminRoute>,
                // },
                // {
                //     path: '/dashboard/allbuyers',
                //     element: <AdminRoute><AdminBuyer></AdminBuyer></AdminRoute>,
                // },
                // Seller Part
                // {
                //     path: '/dashboard/seller',
                //     element: <SellerPrivateRoute><MyProducts></MyProducts></SellerPrivateRoute>
                // },
                // {
                //     path: 'dashboard/addproduct',
                //     element: <SellerPrivateRoute><SellerProductAdded></SellerProductAdded></SellerPrivateRoute>
                // },
                // Buyer Part
                // {
                //     path: 'dashboard/buyer',
                //     element: <BuyerPrivate><Buyer></Buyer></BuyerPrivate>
                // }
            ]
        }
    ]
);
export default routes;