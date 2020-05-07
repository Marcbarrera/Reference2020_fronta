import React from 'react'
import {Link} from 'react-router-dom'

const User_navbar = () => (
    <nav className="user-navbar-not-in">
        <Link to="/signin">signin</Link>
        <Link to="/signup">signup</Link>
    </nav>
)
export default User_navbar;