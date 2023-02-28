import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Login = () => {
    const { register, handleSubmit } = useForm();

    const handleLogin = data => {
        console.log(data);
    }

    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-7 border border-primary rounded-lg shadow-2xl'>
                <h2 className='text-2xl text-center font-bold'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" {...register("email")} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">password</span>
                        </label>
                        <input type="password" {...register("password")} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        <label className="label">
                            <span className="label-text-alt">Forget password?</span>
                        </label>
                    </div>

                    <input type="submit" className='btn btn-accent w-full' value='Login' />
                </form>

                <p className='pt-3 text-center'>
                    New to doctors portal? <Link className='text-primary' to='/signup'>Create an account</Link>
                </p>

                <div className="divider">OR</div>

                <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Login;