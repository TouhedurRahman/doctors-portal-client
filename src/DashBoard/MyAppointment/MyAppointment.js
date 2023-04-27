import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider';
import Loading from '../../Pages/Shared/Loading/Loading';

const MyAppointment = () => {
    const { user } = useContext(AuthContext);

    const url = `http://localhost:5000/bookings?email=${user?.email}`;

    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json();
            return data;
        }
    });

    if (isLoading) {
        return <Loading></Loading>;
    }

    return (
        <div>
            <h3 className='text-3xl text-center text-primary font-bold m-5'>
                <i>
                    My Appointments_
                </i>
            </h3>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th className='text-center'>Sl. No.</th>
                            <th>Patient Name</th>
                            <th>Treatment</th>
                            <th className='text-center'>Date</th>
                            <th className='text-center'>Slot</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map((booking, i) =>
                                <tr key={booking._id}>
                                    <th className='text-center'>
                                        {
                                            `${i + 1}` < 10
                                                ?
                                                `0${i + 1}`
                                                :
                                                `${i + 1}`
                                        }
                                    </th>
                                    <td>{booking.patient}</td>
                                    <td>{booking.treatment}</td>
                                    <td className='text-center'>{booking.appointmentDate}</td>
                                    <td className='text-center'>{booking.slot}</td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppointment;