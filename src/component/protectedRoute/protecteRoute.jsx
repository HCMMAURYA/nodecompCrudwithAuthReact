import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        let login = localStorage.getItem('token');
        if (!login) {
            navigate('/login');
        }
    }, [navigate]);

    const { Component } = props;
    return <Component />;
};

export default ProtectedRoute;
