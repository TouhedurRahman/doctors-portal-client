import { format } from 'date-fns';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../Contexts/AuthProvider';

const BookingModal = ({ treatment, setTreatment, selectedDate, refetch }) => {
    const { name: treatmentName, slots } = treatment;
    const date = format(selectedDate, 'PP');

    const { user } = useContext(AuthContext);

    const handleBooking = event => {
        event.preventDefault();

        const form = event.target;

        const slot = form.slot.value;
        const name = form.name.value;
        const phone = form.phone.value;
        const email = form.email.value;

        const booking = {
            treatment: treatmentName,
            appointmentDate: date,
            slot,
            patient: name,
            email,
            phone
        }
        console.log(booking);
        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    form.reset();
                    setTreatment(null);
                    toast.success("Booking Confirmed");
                    refetch();
                }
            })
    }

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{treatmentName}</h3>
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
                        <input name='name' type="text" defaultValue={user?.displayName} disabled className="input input-bodered input-accent w-full" />
                        <input name='email' type="email" defaultValue={user?.email} disabled placeholder="Email" className="input input-bodered input-accent w-full" />
                        <input name='phone' type="phone" placeholder="Phone Number" className="input input-bodered input-accent w-full" />
                        <input type="submit" value='submit' className='btn btn-accent w-full'></input>
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;