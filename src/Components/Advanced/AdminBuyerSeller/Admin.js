import React, { useContext, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { AuthShare } from '../../Firebase/AuthContext';

const Admin = () => {

    const [allAdminUsers, setAllAdminUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isreload, setIsreload] = useState(true);
    const { user } = useContext(AuthShare);
    const email = user?.email;


    const handleDelete = id => {
        // console.log(id);
        fetch(`https://ecook-backend.vercel.app/deletingUser/${id}`, {
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
        fetch(`https://ecook-backend.vercel.app/user/verify/${id}`, {
            method: 'PUT'
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);

                if (data.modifiedCount > 0)
                    setLoading(false);
                setIsreload(!isreload);
                toast.success(`Seller ${email} is Verified`);
            })
    };


    useEffect(() => {
        fetch('https://ecook-backend.vercel.app/allusers')
            .then(res => res.json())
            .then(data => setAllAdminUsers(data))
        setLoading(false);
    }, [loading, isreload]);


    return (
        <div>
            <ToastContainer
                position="top-center"
                autoClose={800}
            />
            <h2 className='text-4xl font-bold text-center my-5 uppercase'>All Users</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {

                        }
                        {/* <!-- row 1 --> */}

                        {
                            allAdminUsers.map(user =>
                                <tr key={user._id}>
                                    <td>{user.userEmail}</td>
                                    <td>{user.userName}</td>
                                    <td >
                                        {user?.userRole === 'Seller' ?
                                            <>

                                                {user?.status === "Verified" ?
                                                    <div className="btn btn-sm bg-accent">Verified</div>
                                                    :
                                                    <button onClick={() => handleVerify(user._id)} className="btn btn-sm">Verify Now</button>}

                                            </>
                                            :
                                            <>{user.userRole}</>

                                        }</td>
                                    <td  >
                                        {
                                            user?.userRole === 'Admin' ?
                                                <>
                                                    {/* <button className="btn btn-sm hidden" disabled>DELETE</button> */}
                                                </>
                                                :
                                                <>

                                                    <button onClick={() => handleDelete(user._id)} className="btn btn-sm">DELETE</button>
                                                </>

                                        }
                                        {/* <button className="btn btn-sm">DELETE</button> */}

                                    </td>
                                </tr>)
                        }
                        {/* <tr key={user._id}
                                >
                                    <th>{i + 1}</th>
                                    <td>{user.userName}</td>
                                    <td>{user.userRole}</td>
                                    <td>{ }</td>
                                </tr>
                        <tr> */}
                        {/* <th>1</th>
                        <td>Cy Ganderton</td>
                        <td>Quality Control Specialist</td>
                        <td>Blue</td>
                    </tr>
                    {/* <!-- row 2 --> */}

                        {/* <!-- row 3 --> */}
                        {/* */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Admin;