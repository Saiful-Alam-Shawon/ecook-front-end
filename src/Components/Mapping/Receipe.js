import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

const Receipe = ({ receipe, receipes }) => {

    const { category, duration, price, rating, strMeal, strMealThumb, text, _id } = receipe;
    // console.log(receipes.length);





    return (
        <>
            <div className='bg-white shadow-2xl min-h-[500px] group'>
                {/* img */}
                <div className='overflow-hidden'>
                    {strMealThumb ?
                        <>
                            <img className='group-hover:scale-110 transition-all duration-300 w-full h-72' src={strMealThumb} alt="" />
                        </>
                        :
                        <>
                            <div className='group-hover:scale-110 transition-all duration-300 w-full h-72'>
                                <div className='text-amber-400 text-lg font-bold text-center'>Oops No image Found</div>
                            </div>
                        </>
                    }


                </div>
                {/* details */}
                <div className='bg-gray-900 text-white  shadow-lg max-w-[220px] mx-auto h-12 -translate-y-1/2 flex justify-center items-center '>

                    <h1 className=''> <span className='text-xs'>Enjoy To Learn Cooking at</span > <span className='font-tertiary tracking-[1px] font-semibold text-base'>${price}</span> </h1>


                </div>
                {/* Title & description */}
                <div className='text-center'>
                    <h3 className='text-xl uppercase font-semibold'>{strMeal}</h3>
                    <p className='w-64 text-sm my-3 lg:mb-6 mx-auto'>{text.slice(0, 80)}</p>
                </div>
                <div className='text-center'>
                    <Link to={`/details/${_id}`} className='bg-black text-white px-14 py-3 '>
                        SEE DETAILS
                    </Link>
                </div>

            </div>

        </>
    );
};

export default Receipe;