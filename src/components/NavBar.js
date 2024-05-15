import React from 'react'
import { Link, useLocation } from "react-router-dom";
import logo from '../logo.png'
const NavBar = () => {
    let location = useLocation();
    const handleLogout = ()=>{
        localStorage.removeItem('token');
    }
    return (
            <nav className="navbar navbar-expand-lg border-bottom bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><img src={logo} style={{width:"120px"}} alt="" /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                    </div>
                    {!localStorage.getItem('token') ? (<div><Link className="btn btn-dark mx-2" to="/login" role="button">Log in</Link>
                    <Link className="btn btn-dark mx-2" to="/signup" role="button">Sign up</Link></div>) : <Link className="btn btn-dark mx-2" onClick={handleLogout} to="/login" role="button">Log out</Link>}
                </div>
            </nav>
    )
}

export default NavBar