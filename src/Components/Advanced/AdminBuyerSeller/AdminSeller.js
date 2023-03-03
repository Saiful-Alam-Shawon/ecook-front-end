import React, { useContext, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { AuthShare } from '../../Firebase/AuthContext';

const AdminSeller = () => {
    const [allAdminSellerUsers, setAllAdminSellerUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isreload, setIsreload] = useState(true);
    const { user } = useContext(AuthShare);
    const email = user?.email;


    const handleDelete = id => {
        // console.log(id);
        fetch(`http://localhost:5000/deletingUser/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0)
                    // console.log(data);
                    setLoading(false);
                setIsreload(!isreload);
                toast.warning(`${email} User Deleted`);
            })
    };


    const handleVerify = id => {
        // console.log(id);
        fetch(`http://localhost:5000/user/verify/${id}`, {
            method: 'PUT'
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);

                if (data.modifiedCount > 0)
                    setLoading(false);
                setIsreload(!isreload);
                toast.success(`Seller ${email} is Verified`)
            })
    };



    useEffect(() => {
        fetch('http://localhost:5000/allsellers')
            .then(res => res.json())
            .then(data => setAllAdminSellerUsers(data))
        setLoading(false);
    }, [isreload])


    return (
        <div>
            <ToastContainer
                position="top-center"
                autoClose={800}
            />
            <h2 className='text-4xl font-bold text-center my-5'> All SELLERS</h2>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>DELETE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- row 1 --> */}

                        {
                            allAdminSellerUsers.map((user, i) => <tr key={user._id}>
                                <td>{i + 1}</td>
                                <td>{user.userName}</td>
                                <td>{user.userEmail}</td>

                                <td onClick={() => handleVerify(user._id)}>{user?.userRole === 'Seller' ?
                                    <>

                                        {user?.status === "Verified" ?
                                            <div className="btn btn-sm bg-accent">Verified</div>
                                            :
                                            <button className="btn btn-sm">Verify Now</button>}

                                    </>
                                    :
                                    <>{user.userRole}</>

                                }</td>

                                <td onClick={() => handleDelete(user._id)} ><button className="btn btn-sm">DELETE</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminSeller;