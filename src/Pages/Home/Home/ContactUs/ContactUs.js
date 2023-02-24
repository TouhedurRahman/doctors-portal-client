import React from 'react';
import PrimaryButton from '../../../../Components/PrimaryButton/PrimaryButton';
import appointment from '../../../../assets/images/appointment.png';

const ContactUs = () => {
    return (
        <div className="hero rounded"
            style={{
                background: `url(${appointment})`
            }}
        >
            <div className="hero-content">
                <div>
                    <div className='text-center'>
                        <h4 className='text-xl text-primary font-bold'>Contact Us</h4>
                        <h2 className='text-4xl text-white'>Stay connected with us</h2>
                    </div>
                    <div>
                        <input type="text" placeholder="Email Address" className="input input-bordered w-full mt-5" />
                        <input type="text" placeholder="Subject" className="input input-bordered w-full mt-5" />
                        <textarea className="textarea textarea-bordered w-full mt-5" placeholder="Your message"></textarea>
                    </div>
                    <div className="mt-5 text-center">
                        <PrimaryButton>Get Started</PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;