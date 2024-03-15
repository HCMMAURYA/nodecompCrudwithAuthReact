import React from "react";
import "../header/header.css"
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <>
            <div class="header">
                <a href="#default" class="logo">Harish</a>
                <div class="header-right">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                    <Link to="/dashboard">Dashboard</Link>

                </div>
            </div>

        </>
    )
}


export default Header
//dashboard