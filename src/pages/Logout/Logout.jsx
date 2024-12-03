import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import './Logout.css';
function Logout({setToken}) {
    const navigate = useNavigate();

    useEffect(() => {
        setToken('');
        localStorage.removeItem('token');
        navigate('/home');
    }, [navigate, setToken]);

    return null
}

export default Logout;