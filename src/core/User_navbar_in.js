import React from 'react'
import {Link, withRouter} from 'react-router-dom';
import { isAuthenticated } from './Header';

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
    <nav className="user-navbar-in">
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <span style={{cursor:"pointer",color:"#000000"}}
                    onClick={() => signout(() => history.push('/'))}>
                    Signout
                </span> 
            </li>
            <li className="nav-item">
                <span>
                    {isAuthenticated().user.name}
                </span> 
            </li>
        </ul>
    </nav>
)
export default withRouter(User_navbar);