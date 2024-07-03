import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useLoginUser() {
    const navigate = useNavigate();
    const [loginUser, setLoginUser] = useState(() => {
        const storedUser = localStorage.getItem("loginUser");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const setLoggedInUser = (userData) => {
        localStorage.setItem("loginUser", JSON.stringify(userData));
        setLoginUser(userData);
    };

    const logoutUser = () => {
        navigate("/login");
        localStorage.removeItem("loginUser");
        setLoginUser(null);
    };

    return { loginUser, setLoggedInUser, logoutUser };
}