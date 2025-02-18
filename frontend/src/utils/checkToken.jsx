import axios from 'axios';

export const checkToken = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return null;
        }

        const response = await axios.get('http://localhost:3000/api/v1/user/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data.user;
    } catch (error) {
        return null;
    }
};
