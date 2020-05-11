import React from 'react'
import {Link, withRouter} from 'react-router-dom';
import {isAuthenticated, signout} from '../auth/index';

const isActive = (history, path) => {
    if(history.location.pathname === path) return {color: "#ff9900"}
        else return {color: "#000000"}
}

const User_navbar = ({history}) => (
    <nav className="user-navbar-in">
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <span>
                Hi {isAuthenticated().user.name}!
                </span> 
            </li>
            <li className="nav-item">
                <span style={{cursor:"pointer",color:"#000000"}}
                    onClick={() =>signout(() => history.push('/'))}>
                    Signout
                </span> 
            </li>
            <li className="nav-item">
                    <Link to={`/user/${isAuthenticated().user._id}`} 
                     style={
                     isActive(
                         history, 
                         `/user/${isAuthenticated().user._id}`
                         )}>
                    {isAuthenticated().user.name}
                    </Link>                    
            </li>
        </ul>
    </nav>
)
export default withRouter(User_navbar);