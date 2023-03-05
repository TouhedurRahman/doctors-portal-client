import React, {
    // useEffect,
    useState
}
    from 'react';
import { format } from 'date-fns';
import AppointmentOption from './AppointmentOption';
import BookingModal from '../BookingModal/BookingModal';
import { useQuery } from '@tanstack/react-query';

const AvailableAppointments = ({ selectedDate }) => {
    // const [appointmentOptions, setAppointmentOptions] = useState([]);
    const [treatment, setTreatment] = useState(null);

    const { data: appointmentOptions = [] } = useQuery({
        queryKey: ['appointmentOptions'],
        queryFn: async () => {
            const url = 'http://localhost:5000/appointmentOptions';
            const res = await fetch(url);
            const data = await res.json();
            return data;
        }

        /****
        
        queryFn: () => fetch('http://localhost:5000/appointmentOptions')
            .then(res => res.json())
    
        ****/
    });

    /****

    useEffect(() => {
        const url = 'http://localhost:5000/appointmentOptions';

        fetch(url)
            .then(res => res.json())
            .then(data => setappointmentOptions(data))
    }, []) 
    
    ****/

    return (
        <section className='my-16'>
            <p className='text-center text-secondary font-bold'>
                Available Appointments on {format(selectedDate, 'PP')}
            </p>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 mx-5'>
                {
                    appointmentOptions.map(option => <AppointmentOption
                        key={option._id}
                        appointOption={option}
                        setTreatment={setTreatment}
                    ></AppointmentOption>)
                }
            </div>
            {
                treatment &&
                <BookingModal
                    selectedDate={selectedDate}
                    treatment={treatment}
                    setTreatment={setTreatment}
                ></BookingModal>
            }
        </section>
    );
};

export default AvailableAppointments;