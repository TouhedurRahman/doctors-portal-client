import { format } from 'date-fns';
import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import chair from '../../../assets/images/chair.png'

const AppointmentBanner = () => {
    const [selectedDate, setselectedDate] = useState(new Date());
    return (
        <header className='my-6'>
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src={chair} className="lg:max-w-sm rounded-lg shadow-2xl" alt='Loading...' />
                    <div className='mr-6'>
                        <DayPicker
                            mode='single'
                            selected={selectedDate}
                            onSelect={setselectedDate}
                        />
                        <p>You have selected date {format(selectedDate, 'PP')}</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AppointmentBanner;