function messagePopup({ message, onClose }) {
  return (
    <section className="fixed z-20 w-full h-full top-0 left-0 bg-gray-700/75 flex items-center justify-center p-10 animate-fade-in">
        <div className="px-10 py-20 rounded-2xl bg-white border-2 border-red-600 relative animate-scale-up">
            <h3 className="text-lg sm:text-2xl text-center text-red-600">{message}</h3>
            <p className="text-sm text-center absolute top-3 right-5 underline underline-offset-3 cursor-pointer" onClick={() => onClose(false)}>Jag Förstår</p>
        </div>
    </section>
  )
}

export default messagePopup