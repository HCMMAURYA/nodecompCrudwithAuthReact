import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../edit/edit.css';

const Edit = () => {
    const navigate = useNavigate(); 
	const id = localStorage.getItem("id")

    const [userData, setUserData] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
			
            try {
                const response = await axios.get(`https://nodecompcrudwithauth.onrender.com/api/usergetbyid/${id}`);
                setUserData(response.data.data); 
				console.log("???????",response.data.data)
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [id]);

    const inputHandler = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const updateUser = async () => {
        try {
            const response = await axios.put(`https://nodecompcrudwithauth.onrender.com/api/updateuser/${id}`, userData);
            console.log('User updated:', response.data);
            navigate('/dashboard'); // Assuming you navigate back to the dashboard after updating the user
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className="container">
            <div className="screen">
                <div className="screen__content">
                    <div className="login">
                        <h3>Edit User</h3>
                        <div className="login__field">
                            <i className="login__icon fas fa-user"></i>
                            <input
                                className="login__input"
                                type="text"
                                placeholder="Enter Name"
                                name="name"
                                value={userData.name}
                                onChange={inputHandler}
                            />
                        </div>
                        <div className="login__field">
                            <i className="login__icon fas fa-user"></i>
                            <input
                                type="email"
                                className="login__input"
                                placeholder="Enter Email"
                                name="email"
                                value={userData.email}
                                onChange={inputHandler}
                            />
                        </div>
                        <div className="login__field">
                            <i className="login__icon fas fa-user"></i>
                            <input
                                type="number"
                                className="login__input"
                                placeholder="Enter Mobile"
                                name="phone"
                                value={userData.phone}
                                onChange={inputHandler}
                            />
                        </div>
                        <div className="login__field">
                            <i className="login__icon fas fa-lock"></i>
                            <input
                                type="text"
                                className="login__input"
                                placeholder="Password"
                                name="password"
								 readOnly
                                value={userData.password}
                                onChange={inputHandler}
                            />
                        </div>
                        <button className="button login__submit flex" onClick={updateUser}>
                            <span className="button__text">Update</span>
                            <i className="button__icon fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
                <div className="screen__background">
                    <span className="screen__background__shape screen__background__shape4"></span>
                    <span className="screen__background__shape screen__background__shape3"></span>
                    <span className="screen__background__shape screen__background__shape2"></span>
                    <span className="screen__background__shape screen__background__shape1"></span>
                </div>
            </div>
        </div>
    );
};

export default Edit;
