import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthShare } from '../../Firebase/AuthContext';

const MyProducts = () => {


    const { user } = useContext(AuthShare);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isreload, setIsreload] = useState(true);





    const handleDelete = id => {
        // console.log(id);
        fetch(`https://ecook-backend.vercel.app/deletingProduct/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0)
                    // console.log(data);

                    toast.success('Product Deleted')
                setLoading(false);
                setIsreload(!isreload);
            })
    };





    useEffect(() => {
        fetch(`https://ecook-backend.vercel.app/sellerProductsByEmail?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setProducts(data);
                // loading(false);
                setLoading(false);
            })
    }, [user?.email, isreload]);





    return (
        <div >

            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th>

                            </th>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Product Price</th>
                            <th>Actions</th>
                            <th></th>
                        </tr>
                    </thead> {
                        products.length > 0 ?
                            <>
                            </>
                            :
                            <>
                                <div className='text-center font-bold text-3xl uppercase'>
                                    No Product Added Yet
                                </div>
                            </>
                    }

                    {products.map((product, i) =>

                        <tbody key={product._id}>
                            {/* <!-- row 1 --> */}
                            <tr>
                                <th>
                                    {i + 1}
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                {
                                                    product.strMealThumb ?
                                                        <>
                                                            <img src={product.strMealThumb} alt=" " />
                                                        </>
                                                        :
                                                        <>
                                                            <div className='text-xs text-orange-400 text-center'>no img</div>
                                                        </>
                                                }

                                            </div>
                                        </div>

                                    </div>
                                </td>
                                <td>
                                    {product.strMeal}
                                </td>
                                <td>{product.price}</td>
                                <th>
                                    <button onClick={() => handleDelete(product._id)} className="btn btn-sm">Delete</button>
                                </th>

                            </tr>


                        </tbody>
                    )}


                </table>
            </div>

        </div>
    );
};

export default MyProducts;