import React, { useContext, useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { AuthShare } from '../Firebase/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

const SeeDetails = () => {

    const data = useLoaderData();
    const { category, duration, price, rating, strMeal, strMealThumb, text, _id } = data[0];
    // console.log(strMeal);


    const { user } = useContext(AuthShare);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isreload, setIsreload] = useState(true);
    const [error, setError] = useState('');

    const userEmail = user?.email;
    const navigate = useNavigate();
    const newdata = { category, duration, price, rating, strMeal, strMealThumb, text, userEmail };


    const booking = () => {

        console.log(newdata)

        fetch('http://localhost:5000/booking', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newdata)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.acknowledged) {
                    navigate('/dashboard/buyer');
                    // <Link to=""></Link>
                    setLoading(false);
                    setIsreload(!isreload);
                    toast.success(`Thanks for Booking
                     ${strMeal}`)
                }
            })
            .catch(error => setError(error.message));
    }




    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <img src={strMealThumb} alt='' className="max-w-lg rounded-lg shadow-2xl" />
                <div>
                    <h1 className="text-5xl font-bold">{strMeal}</h1>

                    <div className='flex gap-20 '>
                        <p className="pt-6">Price: <span className='text-xl font-bold text-rose-900'>${price}</span></p>
                        <p className="pt-6">Course Duration: <span className='text-xl font-bold text-rose-900'>{duration}</span><span className='text-sm text-center'>days</span> </p>

                    </div>



                    <p className="py-6">{text}</p>
                    <button className='bg-black text-white px-14 py-3 '
                        onClick={() => booking()}
                    >Enroll Recipe</button>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={4000}
            />
        </div>
    );
};

export default SeeDetails;