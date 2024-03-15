import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const LoginForm = () => {
    const navigate = useNavigate();
    const [userLogin, setUserLogin] = useState({
        email: '',
        password: ''
    });

    const inputHandler = (e) => {
        setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
    };
	const submitHandler = async () => {
		try {
		
			const response = await axios.post('https://nodecompcrudwithauth.onrender.com/api/login', {
				email: userLogin.email,
				password: userLogin.password
			} );
            
	
			if (response.status === 200 && response.data.message === 'Login successful.') {
                let token = response.data.token
                 localStorage.setItem('token',token)
                console.log('token>>>>>>>', token)
				console.log('Logged in successfully:', response.data);
				navigate("/dashboard");
			} else {
				alert("Unexpected response from server");
			}
		} catch (error) {

			if(error.response && error.response.status === 402){
				alert("Invalid password");
			}else if(error.response && error.response.status === 403){
				alert("Invalid email")
			}else if (error.response && error.response.status === 401) {
				alert("Invalid email or password");
			} else {
				console.error('Error:', error);
				alert("An error occurred. Please try again later.");
			}
		}
	};
	
	
	

    return (
        <div className="container">
            <div className="screen">
                <div className="screen__content">
                    <div className="login">
                        <div className="login__field">
                            <i className="login__icon fas fa-user"></i>
                            <input
                                type="text"
                                className="login__input"
                                placeholder="User name / Email"
                                name="email"
                                value={userLogin.email}
                                onChange={inputHandler}
                            />
                        </div>
                        <div className="login__field">
                            <i className="login__icon fas fa-lock"></i>
                            <input
                                type="password"
                                className="login__input"
                                placeholder="Password"
                                name="password"
                                value={userLogin.password}
                                onChange={inputHandler}
                            />
                        </div>
                        <button className="button login__submit" onClick={submitHandler}>
                            <span className="button__text">Log In Now</span>
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

export default LoginForm;
