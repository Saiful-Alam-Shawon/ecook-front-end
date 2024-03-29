import React, { useContext, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { AuthShare } from '../Firebase/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import useSeller from '../Advanced/AdminBuyerSeller/useSeller';

const SeeDetails = () => {

    const data = useLoaderData();
    const { category, duration, price, rating, strMeal, strMealThumb, text } = data[0];
    // console.log(strMeal);


    const { user } = useContext(AuthShare);
    const [loading, setLoading] = useState(true);
    const [isreload, setIsreload] = useState(true);
    const [error, setError] = useState('');
    const [isSeller] = useSeller(user?.email);

    const userEmail = user?.email;
    const navigate = useNavigate();
    const newdata = { category, duration, price, rating, strMeal, strMealThumb, text, userEmail };


    const booking = () => {

        console.log(newdata)

        fetch('https://ecook-backend.vercel.app/booking', {
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
                    setLoading(false);
                    setIsreload(!isreload);
                    toast.success(`Thanks for Booking
                     ${strMeal}`)
                }
            })
            .catch(error => setError(error.message));
    };

    const noBooking = () => {
        alert('Seller are not Allow to Buy any Product')
    };

    const withoutuser = () => {
        toast.warning('Please Login First')
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

                    {
                        userEmail ?
                            <>
                                {
                                    isSeller ?
                                        <>
                                            <button className='bg-black text-white px-14 py-3 '
                                                onClick={() => noBooking()}
                                            >Enroll Recipe</button>
                                        </>
                                        :
                                        <>
                                            <button className='bg-black text-white px-14 py-3 '
                                                onClick={() => booking()}
                                            >Enroll Recipe</button>
                                        </>
                                }
                            </>
                            :
                            <>
                                <button className='bg-black text-white px-14 py-3 '
                                    onClick={() => withoutuser()}
                                >Enroll Recipe</button>
                            </>
                    }
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