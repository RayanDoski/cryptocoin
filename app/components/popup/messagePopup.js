function MessagePopup({ message, onClose }) {
  return (
    <section className="fixed z-50 inset-0 bg-black/75 flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="bg-gray-900 rounded-xl shadow-2xl p-8 max-w-sm w-full border border-red-500 relative animate-scale-up-smooth">
        <h3 className="text-xl sm:text-2xl font-bold text-center text-red-400 mb-6">{message}</h3>
        <button
          className="w-full py-3 rounded-lg bg-red-600 text-white font-bold text-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition-all duration-300 transform hover:-translate-y-0.5"
          onClick={() => onClose(false)}
        >
          Jag Förstår
        </button>
      </div>

    </section>
  )
}

export default MessagePopup