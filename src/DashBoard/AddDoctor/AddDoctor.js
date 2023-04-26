import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import Loading from '../../Pages/Shared/Loading/Loading';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddDoctor = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const imageHostKey = process.env.REACT_APP_imgbb_key;

    const navigate = useNavigate();

    const { data: specialties, isLoading } = useQuery({
        queryKey: ['specialty'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/appointmentSpecialty');
            const data = await res.json();
            return data;
        }
    });

    if (isLoading) {
        return <Loading></Loading>;
    }

    const handleAddDoctor = data => {
        const image = data.img[0];
        const formData = new FormData();
        formData.append('image', image);

        const url = `https://api.imgbb.com/1/upload?expiration=600&key=${imageHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    // console.log(imgData.data.url);
                    const doctor = {
                        name: data.name,
                        email: data.email,
                        specialty: data.specialty,
                        image: imgData.data.url
                    }
                    fetch('http://localhost:5000/doctors', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(doctor)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            toast.success(`${data.name} is added successfully`);
                            navigate('/dashboard/managedoctors');
                        })
                }
            })
    }

    return (
        <div className='w-96 p-7'>
            <form onSubmit={handleSubmit(handleAddDoctor)}>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Full Name</span>
                    </label>
                    <input
                        type="text"
                        {...register("name", { required: "Name is required" })}
                        placeholder="User Name"
                        className="input input-accent w-full max-w-xs"
                    />
                    {
                        errors.name && <p className='text-red-600'>{errors.name?.message}</p>
                    }
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        {...register("email", { required: "Email Address is required" })}
                        placeholder="user@gmail.com"
                        className="input input-accent w-full max-w-xs"
                    />
                    {
                        errors.email && <p className='text-red-600'>{errors.email?.message}</p>
                    }
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Specialty</span>
                    </label>
                    <select
                        className="select select-bordered w-full max-w-xs"
                        {...register("specialty", { required: "Photo is required" })}
                    >
                        <option disabled defaultValue>Pick a Specialty</option>
                        {
                            specialties.map(specialty =>
                                <option
                                    key={specialty._id}
                                    value={specialty.name}
                                >
                                    {specialty.name}
                                </option>
                            )
                        }
                    </select>
                </div>

                <div className="form-control w-full max-w-xs mb-5">
                    <label className="label">
                        <span className="label-text">Photo</span>
                    </label>
                    <input
                        type="file"
                        {...register("img", { required: "Photo is required" })}
                        className="w-full max-w-xs"
                    />
                    {
                        errors.img && <p className='text-red-600'>{errors.img?.message}</p>
                    }
                </div>

                <input type="submit" className='btn btn-accent text-white w-full' value='Add Doctor' />
            </form>
        </div>
    );
};

export default AddDoctor;