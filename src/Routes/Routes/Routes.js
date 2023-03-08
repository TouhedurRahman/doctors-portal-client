import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../../Dashboard/Dashboard/Dashboard";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import Appointment from "../../Pages/Appointment/Appointment/Appointment";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login & Register/Login";
import Register from "../../Pages/Login & Register/Register";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/appointment',
                element: <Appointment />
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute>
            <DashboardLayout></DashboardLayout>
        </PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>
            }
        ]
    }
])

export default router;