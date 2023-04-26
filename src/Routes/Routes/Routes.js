import { createBrowserRouter } from "react-router-dom";
import AllUsers from "../../Dashboard/AllUsers/AllUsers";
import MyAppointment from "../../Dashboard/MyAppointment/MyAppointment";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import Appointment from "../../Pages/Appointment/Appointment/Appointment";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login & Register/Login";
import Register from "../../Pages/Login & Register/Register";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import AddDoctor from "../../Dashboard/AddDoctor/AddDoctor";

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
        element:
            <PrivateRoute>
                <DashboardLayout></DashboardLayout>
            </PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                element: <MyAppointment></MyAppointment>
            },
            {
                path: '/dashboard/allusers',
                element:
                    <AdminRoute>
                        <AllUsers></AllUsers>
                    </AdminRoute>
            },
            {
                path: '/dashboard/adddoctor',
                element:
                    <AdminRoute>
                        <AddDoctor></AddDoctor>
                    </AdminRoute>
            }
        ]
    }
])

export default router;