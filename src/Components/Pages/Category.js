import React, { useEffect, useState } from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import Loading from './../Neuture/Loading';
import { ReactPaginate } from 'react-paginate';
import Receipe from './../Mapping/Receipe';
import CategoryReceipe from '../Mapping/CategoryReceipe';

const Category = () => {

    const data = useLoaderData();
    console.log(data.length)


    const [receipes, setRecipes] = useState(true);
    const [loading, setLoading] = useState(true);


    const links = [
        { href: 'beef', label: 'beef' },
        { href: 'vegetarian', label: 'vegetarian' },
        { href: 'chicken', label: 'chicken' },
        { href: "dessert", label: 'dessert' },
        // { href: "all", label: 'all' },
    ]



    // Paginations Start

    const [itemOffset, setItemOffset] = useState(0);
    // const [currentItems, setCurrentItems] = useState(0);
    // const [pageCount, setPageCount] = useState(0);
    const itemsPerPage = 10;


    useEffect(() => {
        // const endOffset = itemOffset + itemsPerPage;
        async function fetchData() {
            // You can await here
            // const response = await MyAPI.getData(someId);
            // const currentItems = await receipes.slice(itemOffset, endOffset);

            //   await  setCurrentItems(receipes.slice(itemOffset, endOffset));
            // ...
        }
        fetchData();
        // setCurrentItems(receipes.slice(itemOffset, endOffset));
        // setPageCount(Math.ceil(receipes.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, receipes]);
    const pageCount = Math.ceil((receipes.length / itemsPerPage));


    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % receipes.length;
        setItemOffset(newOffset);
    };

    // Paginations End





    const handleCategory = (c) => {
        setRecipes('');
        fetch(`http://localhost:5000/category?category=${c}`)
            .then(res => res.json())
            //         // .then(data => console.log(data))
            .then(data => setRecipes(data))
    };



    return (
        <>
            {/* <Receipe></Receipe> */}

            {/* Category & Filter Button */}


            <div className=' text-center w-2/5 mx-auto my-6'>
                <Menu as='div' className='bg-black text-white relative'>
                    <Menu.Button className='w-full h-full px-3 py-[14px] uppercase text-sm text-center'>search others available Category </Menu.Button>
                    <Menu.Items as='ul' className='bg-white w-full flex-col z-40 absolute' >
                        {links.map((link, index) => (
                            /* Use the `active` state to conditionally style the active item. */
                            <Menu.Item as='li' className='border-b last-of-type:border-b-0 h-12 bg-black uppercase text-sm w-full flex items-center justify-center cursor-pointer' key={index} >
                                {({ active }) => (
                                    <Link to={`/category/${link.label}`}>  <a onClick={() => { handleCategory(link.label) }}
                                        href=' '

                                    // className={`${active ? 'bg-blue-500 text-white' : 'bg-white text-black'
                                    //     }`}
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
                        // loading ?
                        //     (<>
                        //         <Loading />
                        //     </>) :

                        // receipes.length > 0 ?
                        data.length > 0 ?


                            // (receipes.map(receipe => {
                            (data.map(receipe => {
                                return <Receipe receipe={receipe} receipes={receipes} key={receipe._id} />

                                // <CategoryReceipe receipe={receipe} receipes={receipes} key={receipe._id} />
                                //  



                            })
                            )

                            :
                            loading ? <>
                                <Loading />
                            </>
                                :
                                (<>
                                    {/* <Loading /> */}
                                    <p>No Result Found</p>
                                    {/* <Error /> */}
                                </>)
                    }
                </div>


            </div>


            {/* <ReactPaginate
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
            /> */}





        </>
    );
};

export default Category;