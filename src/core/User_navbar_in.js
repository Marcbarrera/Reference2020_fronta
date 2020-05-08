import React from 'react'
import {Link, withRouter} from 'react-router-dom';
import {isAuthenticated} from '../auth/index';
import {signout} from '../auth/index';

const isActive = (history, path) => {
    if(history.location.pathname === path) return {color: "#ff9900"}
        else return {color: "#000000"}
}

const User_navbar = ({history}) => (
    <nav className="user-navbar-in">
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <span>
                Welcome {isAuthenticated().user.name}
                </span> 
            </li>
            <li className="nav-item">
                <span style={{cursor:"pointer",color:"#000000"}}
                    onClick={() => signout(() => history.push('/'))}>
                    Signout
                </span> 
            </li>
            <li className="nav-item">
                <span>
                    <Link to={`/user/${isAuthenticated().user._id}`}>
                    {isAuthenticated().user.name}
                    </Link>
                    
                </span> 
            </li>
        </ul>
    </nav>
)
export default withRouter(User_navbar);