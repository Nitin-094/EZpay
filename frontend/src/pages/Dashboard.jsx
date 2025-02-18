import { useNavigate } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { useEffect, useState } from "react";
import axios from "axios";
import { checkToken } from '../utils/checkToken';

export const Dashboard = () => {
    const [balance, setBalance] = useState("");
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        checkToken().then(user => {
            if (!user) {
                navigate('/signup');
            } else {
                setUser(user);
            }
        });

        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(response => {
            setBalance(parseFloat(response.data.balance).toFixed(2));
        });
    }, [navigate]);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/signin');
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
            {user && <Appbar username={user.username} name={user.firstName} onClick={handleLogout} />}
            <div className="container mx-auto p-8">
                {user && (
                    <div className="mb-8 text-center text-white">
                        <h1 className="text-4xl font-bold">Welcome, {user.firstName} {user.lastName}!</h1>
                        <p className="text-xl">{user.username}</p>
                    </div>
                )}
                <Balance value={balance} />
                <Users />
            </div>
        </div>
    );
}
