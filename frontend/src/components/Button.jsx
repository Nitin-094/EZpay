export function Button({ label, onClick }) {
    return (
        <button 
            onClick={onClick} 
            type="button" 
            className="w-full text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 focus:outline-none focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 transition duration-300 transform hover:scale-105"
        >
            {label}
        </button>
    );
}
