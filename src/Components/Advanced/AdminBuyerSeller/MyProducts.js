import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthShare } from '../../Firebase/AuthContext';

const MyProducts = () => {


    const { user, setAds, ads } = useContext(AuthShare);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    // const [isreload, setIsreload] = useState(true);
    const [isreload, setIsreload] = useState(true);


    const handleAds = (product) => {
        fetch('https://ecook-backend.vercel.app/ads', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.acknowledged) {
                    // navigate('/dashboard/product');
                    setLoading(false);
                    setIsreload(!isreload);
                    toast.success('Product Added')
                }
            })
            .catch(error => setError(error.message));

    }

    // console.log(ads);


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

    // console.log(`https://ecook-backend.vercel.app/sellerProductsByEmail?email=${user?.email}`);
    // console.log(products.length);
    // console.log(user.email);
    // no




    return (
        <div >

            {/* // products.map((product, i) => */}

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
                                    {/* <button className="btn btn-ghost btn-xs">Delete</button> */}
                                    <button onClick={() => handleDelete(product._id)} className="btn btn-sm">Delete</button>
                                </th>

                            </tr>


                        </tbody>
                    )}


                </table>
            </div>
            {/* // <div key={product._id} >
                    //     <div className="card w-96 bg-neutral text-neutral-content">
                    //         <div className="card-body items-center text-center">
                    //             <h2 className="card-title"> Name: {product.Name}</h2>
                    //             <p>Price: {product?.Price}</p>
                    //             <p>Used Year: {product.UsedYear}</p>
                    //             <p>Category: {product.Category}</p>
                    //             <p>Condition{product.Condition}</p>
                    //             <p>Mobile: {product.Mobile}</p>
                    //             <p>Seller Location: {product.Location}</p>
                    //             <p>Seller Email: {product.userEmail}</p>
                    //             <div className="card-actions justify-end">
                    //                 <button onClick={() => handleDelete(product._id)} className="btn btn-primary">Delete</button>
                    //                 <button onClick={() => handleAds(product._id)} className="btn btn-primary">Ads</button>
                    //             </div>
                    //         </div>
                    //     </div>
                    // </div> */}






            {/* Extra Card  */}


            {/* <div className="card w-96 bg-neutral text-neutral-content">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">Cookies!</h2>
                    <p>We are using cookies for no reason.</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Accept</button>
                        <button onClick={() => setAds("ok")} className="btn btn-ghost">Deny</button>
                    </div>
                </div>
            </div> */}


        </div>
    );
};

export default MyProducts;