import MainLayout from '../layouts/main-layout/Main_Layout'
import AboutUs from '../pages/AboutUs'
import ContactUs from '../pages/ContactUs'
import Home from '../pages/Home'
import Products from '../pages/Products'
import Error from '../pages/Error'
import Profile from '../pages/profile'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import ProductsComponent from '../components/eCommerce/Products/ProductsComponent'
import Category from '../pages/Category'
import CartPage from '../pages/Cart'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import Payment from '../pages/Payment'
import PaymentInfoComponents from '../components/forms/payment/PaymentInfoComponents'
import PersonalInfoComponent from '../components/forms/payment/PersonalInfoComponent'
import ProtectProfile from '../components/RouteProtect/ProtectProfile'



const router = createBrowserRouter([{
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
        {
            path: "/",
            element: <Home />
        },
        {
            path: "/about",
            element: <AboutUs/>
        },
        {
            path: "/contact",
            element: <ContactUs/>
        },
        {
            path: "/CartPage",
            element: <CartPage />
        },
        {
            path: "/products",
            element: <Products />,
            children:[
                {
                    index: true ,
                    element: <ProductsComponent />,
                },
                {
                    path: "/products/all",
                    element: <ProductsComponent />,
                },
                {
                    path: "/products/category/:cat",
                    element: <Category />,
                }
            ],
        },
        {
            path: "/Login",
            element: <Login />
        },
        {
            path: "/SignUp",
            element: <SignUp />
        },
        {
            path: "/Payment",
            element: <Payment />,
            children: [
                {
                    index: true,
                    path: "/Payment",
                    element: <PersonalInfoComponent />,
                },
                {
                    path: "/Payment/PersonalInfoComponent",
                    element: <PersonalInfoComponent />,
                },
                {
                    path: "/Payment/PaymentInfo",
                    element: <PaymentInfoComponents />,
                }
            ]
        },
        {
            path: "/profile",
            element: (
                <ProtectProfile>
                    <Profile />
                </ProtectProfile>
            )
        }
    ]
}])


export default function AppRouters() {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}
