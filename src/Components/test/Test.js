import { Menu } from '@headlessui/react';
import React, { Fragment } from 'react';
import '../pagination.css'


const links = [
    { href: ' #', label: 'Account settings' },
    { href: ' #', label: 'Support' },
    { href: ' #', label: 'License' },
    { href: " #", label: 'Sign out' },
]





const Test = () => {
    return (


        <Menu as='div' className='bg-yellow-300 text-black relative'>
            <Menu.Button className='w-full h-full px-4 py-3 flex items-center justify-between'>Options</Menu.Button>
            <Menu.Items as='ul' className='bg-white w-full flex-col z-40 absolute' >
                {links.map((link, index) => (
                    /* Use the `active` state to conditionally style the active item. */
                    <Menu.Item as='li' className='border-b last-of-type:border-b-0 h-12 hover:bg-yellow-100 w-full flex items-center justify-center cursor-pointer' key={index} >
                        {({ active }) => (
                            <a
                                href={link.href}
                                className={`${active ? 'bg-blue-500 text-white' : 'bg-white text-black'
                                    }`}
                            >
                                {link.label}
                            </a>
                        )}
                    </Menu.Item>
                ))}
            </Menu.Items>
        </Menu>


    );
};

export default Test;