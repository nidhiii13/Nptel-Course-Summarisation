import React from 'react'
import  './Navbar.css';
//import { Link } from 'react-router-dom';
import logo from './nptel-logo.png';
const Navbar = () => {
    return (
        <>
        <nav className='navbar'>
        <div className="nav-header"><img src={logo} /></div>
        <div className="navlinks">
            <ul>
            <li><a href="#">Home</a></li>
                <li><a href="#">Q&A</a></li>
                <li><a href="http://127.0.0.1:8000/admin">Admin</a></li>
                {/* <li><Link to='/donor'>Donor</Link></li>
                <li><Link to='/recipient'>Recipient</Link></li> */}
                <li><a href="#">Contact us</a></li>
            </ul>
        </div>
        </nav>   
        </>
    )
}

export default Navbar;
