'use client'

import Link from 'next/link'
import { useState } from 'react'

function Header() {
    return (
    <header className='flex items-center justify-between py-4 px-5 sm:px-10 bg-white dark:bg-gray-800 shadow-md'>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-amber-400 animate-gradient">CryptoCoin</h1>
        <Link href="/investments" className="text-[12px] sm:text-[16px] rounded-sm p-2 sm:p-2.5 text-white font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-amber-400 animate-gradient">My Investments</Link>
    </header>
    )
}

export default Header