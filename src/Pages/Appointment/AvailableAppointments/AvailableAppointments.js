import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import AppointmentOption from './AppointmentOption';

const AvailableAppointments = ({ selectedDate }) => {
    const [appointOptions, setAppointOptions] = useState([]);

    useEffect(() => {
        const url = 'appointmentOptions.json';

        fetch(url)
            .then(res => res.json())
            .then(data => setAppointOptions(data))
    }, [])

    return (
        <section className='my-16'>
            <p className='text-center text-secondary font-bold'>
                Available Appointments on {format(selectedDate, 'PP')}
            </p>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6'>
                {
                    appointOptions.map(option => <AppointmentOption
                        key={option._id}
                        appointOption={option}
                    ></AppointmentOption>)
                }
            </div>
        </section>
    );
};

export default AvailableAppointments;