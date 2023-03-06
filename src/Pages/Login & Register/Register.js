import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { AuthContext } from '../../Contexts/AuthProvider';
import { toast } from 'react-hot-toast';
const Register = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const { createUser, updateUser } = useContext(AuthContext);

    // Show and hide password
    const [openPassword, setOpenPassword] = useState(false);
    const [openConfirmPassword, setOpenConfirmPassword] = useState(false);
    const [registerError, setRegisterError] = useState('');
    const navigate = useNavigate();

    const toggleBtnPassword = () => {
        setOpenPassword(!openPassword);
    }

    const toggleBtnConfirmPassword = () => {
        setOpenConfirmPassword(!openConfirmPassword);
    }

    const handleRegister = data => {
        if (data.password === data.confirmPassword) {
            console.log(data);
            setRegisterError('');
            createUser(data.email, data.password)
                .then(result => {
                    const user = result.user;
                    console.log(user);
                    toast.success('User Created Successfully');
                    const userInfo = {
                        displayName: data.name
                    }
                    updateUser(userInfo)
                        .then(() => {
                            navigate('/');
                        })
                        .catch((error) => {
                            setRegisterError(error.message);
                        });
                })
                .catch(error => console.log(error))
        } else {
            toast.error("Password & Confirm Password must be same");
        }
    }

    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 m-5 p-7 border border-primary rounded-lg shadow-2xl'>
                <h2 className='text-2xl text-center font-bold'>Register</h2>
                <form onSubmit={handleSubmit(handleRegister)}>
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
                            <span className="label-text">password</span>
                        </label>
                        <div className='flex'>
                            <div className='w-5/6'>
                                <input
                                    type={(openPassword === false) ? 'password' : 'text'}
                                    {...register("password", {
                                        required: "Password is required",
                                        maxLength: { value: 8, message: "Password must be 6-8 character" },
                                        minLength: { value: 6, message: "Password must be 6-8 character" },
                                        /* pattern: {
                                            value: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])$/,
                                            message: "Password must be Strong"
                                        } */
                                    })}
                                    placeholder="●●●●●●●●"
                                    className="input input-accent w-full max-w-max md:max-w-xs lg:max-w-xs absolute"
                                />
                            </div>
                            <div className='input grid place-content-center w-1/6 border border-accent border-l-0 md:border-r-0 lg:border-r-0 rounded-l-none relative'>
                                {
                                    (openPassword === false)
                                        ?
                                        <AiFillEyeInvisible
                                            style={{ cursor: "pointer" }}
                                            className='w-full text-4xl'
                                            onClick={toggleBtnPassword}
                                        />
                                        :
                                        <AiFillEye
                                            style={{ cursor: "pointer" }}
                                            className='w-full text-4xl'
                                            onClick={toggleBtnPassword}
                                        />
                                }
                            </div>
                        </div>
                        {
                            errors.password && <p className='text-red-600'>{errors.password?.message}</p>
                        }
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Confirm password</span>
                        </label>
                        <div className='flex'>
                            <div className='w-5/6'>
                                <input
                                    type={(openConfirmPassword === false) ? 'password' : 'text'}
                                    {...register("confirmPassword", {
                                        required: "Password is required",
                                        maxLength: { value: 8, message: "Password must be 6-8 character" },
                                        minLength: { value: 6, message: "Password must be 6-8 character" },
                                        /* pattern: {
                                            value: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])$/,
                                            message: "Password must be Strong"
                                        } */
                                    })}
                                    placeholder="●●●●●●●●"
                                    className="input input-accent w-full max-w-max md:max-w-xs lg:max-w-xs absolute"
                                />
                            </div>
                            <div className='input grid place-content-center w-1/6 border border-accent border-l-0 md:border-r-0 lg:border-r-0 rounded-l-none relative'>
                                {
                                    (openConfirmPassword === false)
                                        ?
                                        <AiFillEyeInvisible
                                            style={{ cursor: "pointer" }}
                                            className='w-full text-4xl'
                                            onClick={toggleBtnConfirmPassword}
                                        />
                                        :
                                        <AiFillEye
                                            style={{ cursor: "pointer" }}
                                            className='w-full text-4xl'
                                            onClick={toggleBtnConfirmPassword}
                                        />
                                }
                            </div>
                        </div>
                        {
                            errors.password && <p className='text-red-600'>{errors.password?.message}</p>
                        }
                        <label className="label">
                            <span className="label-text-alt"></span>
                        </label>
                    </div>

                    <input type="submit" className='btn btn-accent text-white w-full' value='Register' />
                </form>

                <p className='pt-3 text-center'>
                    Already have an account? <Link className='text-primary' to='/login'>Please Login</Link>
                </p>

                <div className="divider">OR</div>

                <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Register;