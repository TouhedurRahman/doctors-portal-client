import { format } from 'date-fns';
import React from 'react';

const BookingModal = ({ treatment, setTreatment, selectedDate }) => {
    const { name, slots } = treatment;

    const date = format(selectedDate, 'PP')

    const handleBooking = event => {
        event.preventDefault();

        const form = event.target;

        const slot = form.slot.value;
        const name = form.name.value;
        const phone = form.phone.value;
        const email = form.email.value;

        const booking = {
            appointmentDate: date,
            treatment: name,
            patient: name,
            slot,
            phone,
            email
        }
        console.log(booking);

        form.reset();
        setTreatment(null);
    }

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{name}</h3>
                    <form
                        onSubmit={handleBooking}
                        className='grid gap-3 grid-cols-1 mt-5'
                    >
                        <input type="text" value={date} disabled className="input input-bodered input-accent bg-gray w-full" />
                        <select name='slot' className="select select-bordered w-full">
                            <option defaultValue>~ Select Slots ~</option>
                            {
                                slots.map((slot, i) => <option
                                    value={slot}
                                    key={i}
                                >{slot}</option>)
                            }
                        </select>
                        <input name='name' type="text" placeholder="Full Name" className="input input-bodered input-accent w-full" />
                        <input name='phone' type="phone" placeholder="Phone Number" className="input input-bodered input-accent w-full" />
                        <input name='email' type="email" placeholder="Email" className="input input-bodered input-accent w-full" />
                        <input type="submit" value='submit' className='btn btn-accent w-full'></input>
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;