import { Menu } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import Receipe from './Mapping/Receipe';
import Loading from './Neuture/Loading';
import './pagination.css'



const links = [
    { href: 'beef', label: 'beef' },
    { href: 'vegetarian', label: 'vegetarian' },
    { href: 'chicken', label: 'chicken' },
    { href: "dessert", label: 'dessert' },
]



const Home = () => {

    const [loading, setLoading] = useState(true);
    const [receipes, setRecipes] = useState(true);
    const [errors, setErrors] = useState(false);
    const [search, setSearch] = useState('');
    const [searchvalue, setSearchValue] = useState('');



    useEffect(() => {
        try {
            setLoading(true);
            fetch('https://ecook-backend.vercel.app/all')
                .then(res => res.json())
                // .then(data => console.log(data))
                .then(data => setRecipes(data))
            setLoading(false);

        } catch (error) {
            setErrors(error);
            // console.log(errors);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        try {
            setLoading(true);
            fetch(`https://ecook-backend.vercel.app/search?strMeal=${search}`)
                .then(res => res.json())
                // .then(data => console.log(data))
                .then(data => setSearchValue(data))
            setLoading(false);

        } catch (error) {
            setErrors(error);
            // console.log(errors);
            setLoading(false);
        }
    }, [search]);


    const handleCategory = (c) => {
        setRecipes('');
        fetch(`https://ecook-backend.vercel.app/category?category=${c}`)
            .then(res => res.json())
            //         // .then(data => console.log(data))
            .then(data => setRecipes(data))
    };



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

    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    return (
        <>
            {/* Search Bar */}

            <div className='grid lg:grid-cols-8 gap-3 text-center mt-4 mb-10 w-4/5 mx-auto'>
                <div className='col-span-6'>
                    <input
                        onChange={event => handleSearch(event)}


                        name='search' type="text" placeholder="Search Your Desire Recipe" className="input input-bordered input-md w-full " />
                </div>
                <div className='col-span-2'>
                    <div className=' text-center'>
                        <Menu as='div' className='bg-black text-white relative'>
                            <Menu.Button className='w-full h-full px-3 py-[14px] uppercase text-sm text-center'>search by Category</Menu.Button>
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
                </div>
            </div>

            {/* Category & Filter Button */}


            <div className='container mx-auto lg:px-0' >
                <div className='grid grid-cols-1 max-w-sm mx-auto gap-8 lg:grid-cols-3 lg:max-w-none'>
                    {
                        loading ?
                            (<>
                                <Loading />
                            </>) :
                            searchvalue.length > 0 ?
                                (searchvalue.map(receipe => {
                                    return <Receipe receipe={receipe} receipes={receipes} key={receipe._id} />

                                })
                                )
                                :
                                loading ? <>
                                </>
                                    :
                                    (<>
                                        <Loading />
                                    </>)
                    }
                </div>
            </div>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={1}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                pageLinkClassName='page-num'
                previousLinkClassName='page-num'
                nextLinkClassName='page-num'
                activeLinkClassName='active'
            />
        </>

    );




};

export default Home;