import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
            .then(response => {
                setUsers(response.data.user);
            });
    }, [filter]);

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4">
            <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg">
                <div className="font-bold mt-6 text-2xl text-purple-600">
                    Users
                </div>
                <div className="my-4">
                    <input 
                        onChange={(e) => setFilter(e.target.value)} 
                        type="text" 
                        placeholder="Search users..." 
                        className="w-full px-4 py-2 border rounded-lg border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                </div>
                <div className="space-y-4">
                    {users.map(user => <User key={user._id} user={user} />)}
                </div>
            </div>
        </div>
    );
};

function User({ user }) {
    const navigate = useNavigate();

    return (
        <div className="flex justify-between items-center p-4 bg-gray-100 shadow rounded-lg">
            <div className="flex items-center">
                <div className="rounded-full h-12 w-12 bg-purple-200 flex items-center justify-center text-purple-600 text-xl font-bold mr-4">
                    {user.firstName[0]}
                </div>
                <div>
                    <div className="text-lg font-semibold text-gray-800">
                        {user.firstName} {user.lastName}
                    </div>
                    <div className="text-gray-500">
                        {user.email}
                    </div>
                </div>
            </div>
            <div>
                <Button 
                    onClick={() => navigate("/send?id=" + user._id + "&name=" + user.firstName)} 
                    label="Send Money" 
                    className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-4 py-2 rounded-lg shadow hover:from-purple-600 hover:via-pink-600 hover:to-red-600 transition-transform transform hover:scale-105"
                />
            </div>
        </div>
    );
}
