import React, { useEffect, useState } from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import Loading from './../Neuture/Loading';
import Receipe from './../Mapping/Receipe';

const Category = () => {

    const data = useLoaderData();
    console.log(data.length)


    const [receipes, setRecipes] = useState(true);
    const [loading, setLoading] = useState(true);


    const links = [
        { href: 'beef', label: 'beef' },
        { href: 'vegetarian', label: 'vegetarian' },
        { href: 'chicken', label: 'chicken' },
        { href: "dessert", label: 'dessert' }
    ]



    // Paginations Start

    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 10;


    useEffect(() => {
        async function fetchData() {
        }
        fetchData();
    }, [itemOffset, itemsPerPage, receipes]);
    const pageCount = Math.ceil((receipes.length / itemsPerPage));


    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % receipes.length;
        setItemOffset(newOffset);
    };

    // Paginations End





    const handleCategory = (c) => {
        setRecipes('');
        fetch(`https://ecook-backend.vercel.app/category?category=${c}`)
            .then(res => res.json())
            //         // .then(data => console.log(data))
            .then(data => setRecipes(data))
    };



    return (
        <>

            {/* Category & Filter Button */}

            <div className=' text-center w-2/5 mx-auto my-6'>
                <Menu as='div' className='bg-black text-white relative'>
                    <Menu.Button className='w-full h-full px-3 py-[14px] uppercase text-sm text-center'>search others available Category </Menu.Button>
                    <Menu.Items as='ul' className='bg-white w-full flex-col z-40 absolute' >
                        {links.map((link, index) => (
                            <Menu.Item as='li' className='border-b last-of-type:border-b-0 h-12 bg-black uppercase text-sm w-full flex items-center justify-center cursor-pointer' key={index} >
                                {({ active }) => (
                                    <Link to={`/category/${link.label}`}>  <a onClick={() => { handleCategory(link.label) }}
                                        href=' '
                                    >
                                        {link.label}
                                    </a>
                                    </Link>
                                )}
                            </Menu.Item>
                        ))}
                    </Menu.Items>
                </Menu>
            </div>

            {/* Search & Filter Button End*/}



            <div className='container mx-auto lg:px-0' >
                <div className='grid grid-cols-1 max-w-sm mx-auto gap-8 lg:grid-cols-3 lg:max-w-none'>
                    {
                        data.length > 0 ?
                            (data.map(receipe => {
                                return <Receipe receipe={receipe} receipes={receipes} key={receipe._id} />
                            })
                            )
                            :
                            loading ? <>
                                <Loading />
                            </>
                                :
                                (<>
                                    <p>No Result Found</p>
                                </>)
                    }
                </div>


            </div>






        </>
    );
};

export default Category;