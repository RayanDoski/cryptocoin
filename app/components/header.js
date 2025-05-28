'use client'

import Link from 'next/link'
import { useState } from 'react'

function Header() {

    const [isOpen, setIsOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
    <header className='flex items-center justify-between py-4 px-5 sm:px-10 bg-white dark:bg-gray-800 shadow-md'>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-amber-400 animate-gradient">CryptoCoin</h1>
        
        <h2 className='block sm:hidden text-sm cursor-pointer' onClick={() => handleMenuToggle()}>menu</h2>

        {/* För mobil */}
        {isOpen && (
        <ul className='absolute top-16 left-0 w-full bg-white dark:bg-gray-800 shadow-lg flex flex-col items-center gap-4 py-4 sm:hidden'>
            <li className='text-gray-800 dark:text-gray-200 text-lg font-semibold'>
                <Link href="/dashboard" onClick={() => setIsOpen(false)}>Home</Link>
            </li>
            <li className='text-gray-800 dark:text-gray-200 text-lg font-semibold'>
                <Link href="/dashboard" onClick={() => setIsOpen(false)}>All Coins</Link>
            </li>
            <li className='text-gray-800 dark:text-gray-200 text-lg font-semibold'>
                <Link href="/dashboard" onClick={() => setIsOpen(false)}>Investments</Link>
            </li>
            <li className='text-gray-800 dark:text-gray-200 text-lg font-semibold'>
                <Link href="/dashboard" onClick={() => setIsOpen(false)}>About Us</Link>
            </li>
            <li className='text-gray-800 dark:text-gray-200 text-lg font-semibold'>
                <Link href="/dashboard" onClick={() => setIsOpen(false)}>Contact</Link>
            </li>
        </ul>
        )}

        {/* För desktop */}
        <ul className='hidden sm:flex gap-4 text-gray-800 dark:text-gray-200 sm:text-sm lg:text-lg font-semibold'>
            <Link href="/dashboard">Home</Link>
            <Link href="/dashboard">All Coins</Link>
            <Link href="/dashboard">Investments</Link>
            <Link href="/dashboard">About Us</Link>
        </ul>
    </header>
    )
}

export default Header