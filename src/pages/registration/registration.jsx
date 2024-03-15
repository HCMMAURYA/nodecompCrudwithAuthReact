import React, { useState } from 'react';
import "../registration/registration.css"
import { useNavigate } from "react-router-dom";
import axios from 'axios'


const Registration = () => {
	const navigate = useNavigate();
	const createUser = {
		name: '',
		phone: '',
		email: '',
		password: '',
	};

	const [adduser, setAddUser] = useState(createUser);

	const inputHandler = (e) => {
		setAddUser({ ...adduser, [e.target.name]: e.target.value });
	};

	const userCreateHandler = async () => {
		try {
			const  data  = await axios.post("https://nodecompcrudwithauth.onrender.com/api/create", adduser);
			console.log("add user", data);
		
			navigate("/login");
		}
		
		
		catch (error) {
			console.error("Error:", error);
			alert("Something went wrong...");
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
								className="login__input"
								type="text"
								placeholder="Enter Name"
								name="name"
								value={adduser.name}
								onChange={(e) => inputHandler(e)}
							/>
						</div>
						<div className="login__field">
							<i className="login__icon fas fa-user"></i>
							<input
								type="email"
								className="login__input"
								placeholder=" Enter Email"
								name="email"
								value={adduser.email}
								onChange={(e) => inputHandler(e)}
							/>
						</div>
						<div className="login__field">
							<i className="login__icon fas fa-user"></i>
							<input
								type="number"
								className="login__input"
								placeholder=" Enter Mobile"
								name="phone"
								value={adduser.phone}
								onChange={(e) => inputHandler(e)}
							/>
						</div>
						<div className="login__field">
							<i className="login__icon fas fa-lock"></i>
							<input
								type="password"
								className="login__input"
								placeholder="Password"
								name="password"
								value={adduser.password}
								onChange={(e) => inputHandler(e)}
							/>
						</div>
						<button
							className="button login__submit flex"
							onClick={userCreateHandler}
						>
							<span className="button__text">Register Now</span>
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

export default Registration;
