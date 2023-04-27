import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Loading from '../../Pages/Shared/Loading/Loading';
import { RiDeleteBin6Line } from 'react-icons/ri';
import ConfirmationModal from '../../Pages/Shared/ConfirmationModal/ConfirmationModal';

const ManageDoctors = () => {
    const [deletingDoctor, setDeletingDoctor] = useState(null);

    const closeModal = () => {
        setDeletingDoctor(null);
    }

    const { data: doctors, isLoading } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                const result = await fetch('http://localhost:5000/doctors', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await result.json();
                return data;
            }
            catch (error) {

            }
        }
    })

    if (isLoading) {
        return <Loading></Loading>;
    }

    const handleDeleteDoctor = (doctor) => {
        console.log(doctor);
    }

    return (
        <div>
            <h3 className='text-3xl text-center text-primary font-bold m-5'>
                <i>
                    Total Doctors: {
                        `${doctors?.length}` < 10
                            ?
                            `0${doctors?.length}`
                            :
                            `${doctors?.length}`
                    }
                </i>
            </h3>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th className='text-center'>Sl. No.</th>
                            <th className='text-center'>PIcture</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Specialty</th>
                            <th className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors.map(
                                (doctor, i) =>
                                    <tr
                                        key={doctor._id}
                                    >
                                        <th className='text-center'>
                                            {
                                                `${i + 1}` < 10
                                                    ?
                                                    `0${i + 1}`
                                                    :
                                                    `${i + 1}`
                                            }
                                        </th>
                                        <td className='text-center'>
                                            <div className="avatar flex justify-center items-center">
                                                <div className="w-10 rounded-full">
                                                    <img src={doctor.image} alt='doctor...' />
                                                </div>
                                            </div>
                                        </td>
                                        <td>{doctor.name}</td>
                                        <td>{doctor.email}</td>
                                        <td>{doctor.specialty}</td>
                                        <td>
                                            <div className="flex justify-center items-centerr">
                                                <label
                                                    htmlFor="confirmation-modal"
                                                    onClick={() => setDeletingDoctor(doctor)}
                                                >
                                                    <RiDeleteBin6Line
                                                        className='text-[red]'
                                                    />
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingDoctor
                &&
                <ConfirmationModal
                    title={`Are you sure to delete?`}
                    message={`If you delete ${deletingDoctor.name}. It can't be undone.`}
                    modalData={deletingDoctor}
                    successAction={handleDeleteDoctor}
                    closeModal={closeModal}
                ></ConfirmationModal>
            }
        </div>
    );
};

export default ManageDoctors;