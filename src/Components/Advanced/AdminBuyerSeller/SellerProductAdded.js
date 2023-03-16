import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { AuthShare } from '../../Firebase/AuthContext';


const SellerProductAdded = () => {


    const { user } = useContext(AuthShare);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const userEmail = user?.email;
    const rating = '';

    const { register, handleSubmit } = useForm();

    const productSubmit = data => {

        const formData = new FormData();

        fetch('https://ecook-backend.vercel.app/allProducts', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ ...data, userEmail, rating })
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.acknowledged) {
                    // navigate('/dashboard/product');
                    toast.success('Product Added')
                }
            })
            .catch(error => setError(error.message));


        // console.log({ ...data, userEmail });

    }



    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={800}
            />
            <form onSubmit={handleSubmit(productSubmit)} className='w-1/3 mx-auto'>
                <div className="form-control  max-w-xs">
                    <label className="label"><span className="label-text">Name</span></label>
                    <input type="text" {...register("strMeal")} placeholder="Type here" className="input input-bordered w-full max-w-xs" required />
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Price</span></label>
                    <input type="text" {...register("price")} placeholder="Type here" className="input input-bordered w-full max-w-xs" required />
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Course Time</span></label>
                    <input type="text" {...register("duration")} placeholder="Type here" className="input input-bordered w-full max-w-xs" required />
                </div>


                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Description</span></label>
                    <textarea {...register("text")} placeholder="Description" className="input input-bordered w-full max-w-xs" required />
                </div>


                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Category</span></label>
                    <select {...register("category", { required: true })} className="select select-bordered">
                        <option value="beef">beef</option>
                        <option value="vegetarian">vegetarian</option>
                        <option value="chicken">chicken</option>
                        <option value="dessert">dessert</option>
                    </select>
                </div>

                <div className="form-control " aria-disabled>
                    <label className="label"><span className="text-xs text-orange-600 uppercase">Due to memory issue, we receive image URL instead of directly image</span></label>
                    <input type="file" placeholder="Type here" className=" w-full max-w-xs" />
                </div>

                <div className="form-control w-full max-w-xs" >
                    <label className="label"><span className="label-text">Image URL</span></label>
                    <input type="text" {...register("strMealThumb")} placeholder="Image URL" className="input input-bordered w-full max-w-xs" />
                </div>

                <p>{error}</p>
                <input className="btn btn-sm bg-black m-5 w-1/3 mx-auto" type="submit" />
            </form>
        </>

    );
};

export default SellerProductAdded;