
import Header from './components/header';

export default function Home() {
  return (
    <>
      <Header />
      <div className='flex flex-col items-center justify-center py-50 w-full h-64 bg-gradient-to-r from-purple-600 via-pink-500 to-amber-400 animate-gradient bg-[length:200%_200%]'>
        <main className="flex flex-col items-center justify-center p-10 rounded-2xl shadow-2xl bg-white">
          <h1 className="text-2xl font-bold mb-5 text-center">Welcome to CryptoCoin</h1>
          <aside className="text-gray-500 mb-5 text-center">
            <p>Your one-stop solution for cryptocurrency tracking and investments.</p>
            <p>Explore our features and start your crypto journey today!</p>
          </aside>
        </main>

      </div>
    </>
    
  );
}
