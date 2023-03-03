import React from 'react';

const Search = () => {
    return (
        <div className='text-center mt-4 mb-10'>
            <input type="text" placeholder="Search Your Desire Recipe" className="input input-bordered input-md w-3/5 mx-auto " />
            <button className='btn btn-wide'>
                submit
            </button>
        </div>
    );
};

export default Search;