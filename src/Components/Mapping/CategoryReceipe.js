import React, { } from 'react';
import { Link } from 'react-router-dom';

const CategoryReceipe = ({ receipe }) => {

    const { category, duration, price, rating, strMeal, strMealThumb, text } = receipe;






    return (
        <>
            <div className='bg-white shadow-2xl min-h-[500px] group'>
                {/* img */}
                <div className='overflow-hidden'>
                    <img className='group-hover:scale-110 transition-all duration-300 w-full h-72' src={strMealThumb} alt="" />

                </div>
                {/* details */}
                <div className='bg-gray-900 text-white  shadow-lg max-w-[280px] mx-auto h-12 -translate-y-1/2 flex justify-center items-center uppercase font-tertiary tracking-[1px] font-semibold text-base'>
                    <h1 className=''>Duration</h1>


                </div>
                {/* Title & description */}
                <div className='text-center'>
                    <h3 className='text-xl uppercase font-semibold'> {strMeal}</h3>
                    <p className='w-64 text-sm my-3 lg:mb-6 mx-auto'>{text.slice(0, 80)}</p>
                </div>
                <div className='text-center'>
                    <Link to='' className='bg-black text-white px-14 py-3 '
                    >
                        SEE DETAILS
                    </Link>
                </div>

            </div>

        </>
    );
};

export default CategoryReceipe;