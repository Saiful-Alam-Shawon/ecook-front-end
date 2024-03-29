import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthShare } from '../Firebase/AuthContext';




const Login = () => {


    const [error, setError] = useState('');
    const { login } = useContext(AuthShare);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';



    const handleLogin = (event) => {
        event.preventDefault();
        setError('');
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;


        console.log(email,);

        login(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                navigate(from, { replace: true });
            })
            .catch(error => setError(error.message));

    }





    return (

        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content  ">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <h1 className="text-5xl font-bold text-center">Login now!</h1>
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" name='email' placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" />
                            <label className="label">
                                <Link to='/register' className="label-text-alt link link-hover">Register</Link>
                            </label>
                            {error && <p className='text-red-600'>{error}</p>}
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary bg-black">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>


    );
};

export default Login;