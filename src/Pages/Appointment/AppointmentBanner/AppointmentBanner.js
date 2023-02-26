import React from 'react';
import { DayPicker } from 'react-day-picker';
import bg from "../../../assets/images/bg.png";
import chair from '../../../assets/images/chair.png'

const AppointmentBanner = ({ selectedDate, setselectedDate }) => {


    return (
        <header className='my-6 rounded'>
            <div
                className="hero"
                style={{
                    background: `url(${bg})`
                }}
            >
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src={chair} className="lg:max-w-sm rounded-lg shadow-2xl" alt='Loading...' />
                    <div className='mr-6'>
                        <DayPicker
                            mode='single'
                            selected={selectedDate}
                            onSelect={setselectedDate}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AppointmentBanner;