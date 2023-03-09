import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import { toast, ToastContainer } from 'react-toastify';
import { AuthShare } from '../../Firebase/AuthContext';

const Buyer = () => {

    const { user } = useContext(AuthShare);
    const [AllBookedRecipe, setAllBookedRecipe] = useState([]);
    const [id, setId] = useState();
    const [loading, setLoading] = useState(true);
    const [isreload, setIsreload] = useState(true);


    const handleDelete = id => {
        // console.log(id);
        fetch(`https://ecook-backend.vercel.app/BuyerProduct/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0)
                    // console.log(data);

                    toast.success('Course Cancel Successfully')
                setLoading(false);
                setIsreload(!isreload);
            })
    };




    useEffect(() => {
        fetch(`https://ecook-backend.vercel.app/buyerProductsByEmail?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setAllBookedRecipe(data);
                // loading(false);
                setLoading(false);
            })
    }, [user?.email, isreload]);

    // const onToken = (token) => {
    //     fetch('/save-stripe-token', {
    //         method: 'POST',
    //         body: JSON.stringify(token),
    //     }).then(response => {
    //         response.json().then(data => {
    //             alert(`We are in business, ${data.email}`);
    //         });
    //     });
    // }

    const handlePayment = id => {
        // console.log(id);
        fetch(`https://ecook-backend.vercel.app/booking/status/${id}`, {
            method: 'PUT'
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);

                if (data.modifiedCount > 0)
                    // setLoading(false);
                    setIsreload(!isreload);
                // toast.success('User Updated')
            })
    };

    const onToken = (token) => {
        // console.log("Every");
        // console.log(token.id);

        if (!token.id) {
            // console.log('No token');
            alert(`Something wrong, Please try Again`);
        } else {
            // console.log(token.id,);
            handlePayment(id)
        }
    }





    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={500}
            />
            <div className='w-11/12 mx-auto'>
                <h2 className='text-3xl font-bold text-center my-10'>Buyer Booked This Items</h2>
                <div className='grid lg:grid-cols-2 gap-4'>
                    {
                        AllBookedRecipe.map(receipe =>

                            <div key={receipe._id} className="max-w-lg p-4 shadow-md dark:bg-gray-900 dark:text-gray-100">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <img src={receipe.strMealThumb} alt="" className="block object-cover object-center w-full rounded-md h-96 dark:bg-gray-500" />
                                        <div className="flex items-center text-xs">
                                            <span>Duration {receipe.duration} days</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <a rel="noopener noreferrer" href=" #" className="block">
                                            <h3 className="text-xl font-semibold  text-center dark:text-violet-400">{receipe.strMeal}</h3>
                                        </a>
                                        <p className="leading-snug dark:text-gray-400">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, excepturi. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, excepturi.</p>

                                        {
                                            receipe.status === "Paid" ?
                                                <>
                                                    <p className='bg-lime-500 text-center w-11/12 mx-auto text-black px-8 py-2 uppercase text-sm ' >
                                                        You Have successfully Enrolled {receipe.strMeal}
                                                    </p>
                                                </>
                                                :
                                                <>
                                                    <div className='w-4/5 mx-auto grid lg:grid-cols-2 gap-2'>

                                                        <StripeCheckout
                                                            token={onToken}
                                                            amount={receipe.price * 100}
                                                            currency="USD"
                                                            stripeKey="pk_test_51MAQCQFQ87m4QnJ0whHlzBOxZcTypWvk4vL6MrH0H31KhXXyPbpRYDK1xglR2Z1uPSRh5rWro3ZDUwygWmEzOwjy00fyNMPxe1"
                                                        >
                                                            <button className='bg-black text-white px-8 py-2 '
                                                                onClick={() => setId(receipe._id)}
                                                            >Pay Now <span className=''>${receipe.price}</span>
                                                            </button>
                                                        </StripeCheckout>


                                                        <button className='bg-black text-white px-8 py-2 '
                                                            onClick={() => handleDelete(receipe._id)}
                                                        >Course Cancel
                                                        </button>
                                                    </div>
                                                </>
                                        }




                                    </div>
                                </div>
                            </div>


                            // <div key={product._id} >
                            //     <div className="card w-96 bg-neutral text-neutral-content">
                            //         <div className="card-body items-center text-center">
                            //             <h2 className="card-title">{product.name}</h2>
                            //             <p>{product.selling}</p>
                            //             <p>{product.location}</p>
                            //             <div className="card-actions justify-end">
                            //                 <Link to={`/dashboard/dash1boar1db1/pay/${product._id}`}>   <button className="btn btn-primary">Pay</button></Link>
                            //                 <button onClick={() => handleDelete(product._id)} className="btn btn-ghost">Delete</button>
                            //             </div>
                            //         </div>
                            //     </div>
                            // </div>
                        )
                    }



                </div>





            </div>
        </>
    );
};

export default Buyer;