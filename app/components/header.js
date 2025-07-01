'use client'

import Link from 'next/link'

function Header() {
    return (
        <header className='flex items-center justify-between py-4 px-8 bg-white border-b border-gray-200'>
            <Link href="/" className="flex items-center space-x-2">
                <div className='w-8 h-8 bg-purple-600 rounded-lg animate-pulse flex justify-center items-center text-amber-50 font-bold'>CC</div>
                <span className="text-xl font-bold text-gray-900">Crypto Coin</span>
            </Link>
            <Link href="/investments" className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-pink-500 group-hover:from-purple-600 group-hover:to-pink-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-purple-200">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-gray-900 rounded-md group-hover:bg-opacity-0 group-hover:text-black">
                    My Investments
                </span>
            </Link>
        </header>
    )
}

export default Header