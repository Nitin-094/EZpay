export const Balance = ({ value }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between text-center mb-8">
            <div className="text-2xl font-bold text-gray-800">
                Your balance
            </div>
            <div className="text-3xl font-semibold text-green-600 ml-4">
                ₹ {value}
            </div>
        </div>
    );
}
