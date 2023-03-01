import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useState } from 'react';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [open, setOpen] = useState(false);

    const toggleBtn = () => {
        setOpen(!open);
    }

    const handleLogin = data => {
        console.log(data);
    }

    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 m-5 p-7 border border-primary rounded-lg shadow-2xl'>
                <h2 className='text-2xl text-center font-bold'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
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
                                    type={(open === false) ? 'password' : 'text'}
                                    {...register("password", {
                                        required: "Password is required",
                                        maxLength: { value: 8, message: "Password must be 6-8 character" },
                                        minLength: { value: 6, message: "Password must be 6-8 character" }
                                    })}
                                    placeholder="●●●●●●●●"
                                    className="input input-accent w-full max-w-max lg:max-w-xs absolute"
                                />
                            </div>
                            <div className='input grid place-content-center w-1/6 border border-accent border-l-0 lg:border-r-0 rounded-l-none relative'>
                                {
                                    (open === false)
                                        ?
                                        <AiFillEyeInvisible
                                            className='w-full text-4xl'
                                            onClick={toggleBtn}
                                        />
                                        :
                                        <AiFillEye
                                            className='w-full text-4xl'
                                            onClick={toggleBtn}
                                        />
                                }
                            </div>
                        </div>
                        {
                            errors.password && <p className='text-red-600'>{errors.password?.message}</p>
                        }
                        <label className="label">
                            <span className="label-text-alt">Forget password?</span>
                        </label>
                    </div>

                    <input type="submit" className='btn btn-accent text-white w-full' value='Login' />
                </form>

                <p className='pt-3 text-center'>
                    New to doctors portal? <Link className='text-primary' to='/register'>Create an account</Link>
                </p>

                <div className="divider">OR</div>

                <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Login;