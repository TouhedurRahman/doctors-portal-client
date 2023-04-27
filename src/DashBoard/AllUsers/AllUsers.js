import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { RiDeleteBin6Line } from 'react-icons/ri';
import ConfirmationModal from '../../Pages/Shared/ConfirmationModal/ConfirmationModal';

const AllUsers = () => {
    const [deletingUser, setDeletingUser] = useState(null);

    const closeModal = () => {
        setDeletingUser(null);
    }

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users');
            const data = await res.json();
            return data;
        }
    })

    const handleMakeAdmin = id => {
        fetch(`http://localhost:5000/users/admin/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    toast.success('Make admin Successfull');
                    refetch();
                }
            })
    }

    const handleDeleteUser = data => {
        console.log(data);
    }

    return (
        <div>
            <h3 className='text-3xl text-center text-primary font-bold m-5'>
                <i>
                    All Users_
                </i>
            </h3>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th className='text-center'>Sl. No.</th>
                            <th>User's Name</th>
                            <th>Email</th>
                            <th className='text-center'>Admin</th>
                            <th className='text-center'>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, i) =>
                                <tr key={user._id}>
                                    <th className='text-center'>
                                        {
                                            `${i + 1}` < 10
                                                ?
                                                `0${i + 1}`
                                                :
                                                `${i + 1}`
                                        }
                                    </th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td className="flex justify-center items-center">
                                        {
                                            user?.role !== 'admin'
                                                ?
                                                <button
                                                    onClick={() => handleMakeAdmin(user._id)}
                                                    className='btn btn-xs btn-primary rounded-full'
                                                >
                                                    Make Admin
                                                </button>
                                                :
                                                <button
                                                    className='btn btn-xs bg-green-500 hover:bg-green-400 text-white font-bold py-auto px-4 rounded-full pointer-events-none'
                                                >
                                                    Already Admin
                                                </button>

                                        }

                                    </td>
                                    <td>
                                        <div className="flex justify-center items-centerr">
                                            <label
                                                htmlFor="confirmation-modal"
                                                onClick={() => setDeletingUser(user)}
                                            >
                                                <RiDeleteBin6Line
                                                    className='text-[red]'
                                                />
                                            </label>
                                        </div>
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingUser
                &&
                <ConfirmationModal
                    title={`Are you sure to delete?`}
                    message={`If you delete ${deletingUser.name}. It can't be undone.`}
                    modalData={deletingUser}
                    successAction={handleDeleteUser}
                    closeModal={closeModal}
                ></ConfirmationModal>
            }
        </div>
    );
};

export default AllUsers;