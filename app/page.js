
import Header from './components/header';
import GetCoins from './components/getCoins';
import Money from './components/money';
import MessagePopup from './components/popup/messagePopup'

import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Header />
      <div className='relative flex flex-col items-center justify-center py-20 px-4 sm:px-8 w-full min-h-[500px] overflow-hidden bg-white'>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:linear-gradient(to_bottom,white,rgba(255,255,255,0.1))]"></div>

        <main className="relative flex flex-col items-center justify-center p-8 md:p-10 lg:p-12 rounded-3xl shadow-xl bg-white/90 backdrop-blur-sm transform transition-all duration-500 hover:scale-[1.02] border border-gray-100">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 text-center text-gray-900 leading-tight animate-fade-in-up">
            Welcome to CryptoCoin
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-6 text-center max-w-2xl animate-fade-in-up animation-delay-200">
            Your one-stop solution for seamless cryptocurrency tracking and smart investments.
          </p>
          <p className="text-lg md:text-xl text-gray-700 mb-10 text-center max-w-2xl animate-fade-in-up animation-delay-400">
            Explore our cutting-edge features and ignite your crypto journey today!
          </p>
          <Link href="/investments" className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm sm:text-base font-medium rounded-lg group bg-gradient-to-br from-purple-600 to-pink-500 group-hover:from-purple-600 group-hover:to-pink-500 focus:ring-4 focus:outline-none focus:ring-purple-200 animate-scale-in">
            <span className="relative px-7 py-3 transition-all ease-in duration-75 bg-white text-gray-900 rounded-md group-hover:bg-opacity-0">
              My Investments
            </span>
          </Link>
        </main>
      </div>
      <Money />
      <GetCoins />
    </>
  );
}
