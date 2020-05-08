import React from 'react'
import {Link, withRouter} from 'react-router-dom';

const isActive = (history, path) => {
    if(history.location.pathname === path) return {color: "#ff9900"}
        else return {color: "#000000"}
}

export const signout = (next) => {
    if(typeof window !== "undefined") localStorage.removeItem("jwt")
    next()
    return fetch("http://localhost:8080/signout", {
        method: "GET"
    })
    .then(response => {
        console.log("signout", response)
        return response.json()
    })
    .catch(err => console.log(err))
}


const User_navbar = ({history}) => (
    <nav className="user-navbar-not-in">
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <Link style={isActive(history, "/signin")} to="/signin">
                    Singin
                </Link>
            </li>
            <li className="nav-item">
                <Link style={isActive(history, "/signup")} to="/signup">
                    Signup
                </Link>
            </li>
        </ul>
    </nav>
)
export default withRouter(User_navbar);