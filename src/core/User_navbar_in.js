import React from 'react'
import {Link, withRouter} from 'react-router-dom';
import {isAuthenticated, signout} from '../auth/index';
import ProfilePicture from '../user/ProfilePicture'

const isActive = (history, path) => {
    if(history.location.pathname === path) return {color: "#ff9900"}
        else return {color: "#000000"}
}

const User_navbar = ({history}) => (
    <nav className="user-navbar-in">
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <span>
                Hi <Link to={`/user/${isAuthenticated().user._id}`} 
                     style={isActive(history,`/user/${isAuthenticated().user._id}`)}>
                    {isAuthenticated().user.name}
                    </Link>!  
                </span> 
            </li>
            <li className="nav-item">
                <span style={{cursor:"pointer",color:"#000000"}}
                    onClick={() =>signout(() => history.push('/'))}>
                    Signout
                </span> 
            </li>
            <li className="user_menu">
                <div className="image-profile-div">
                <ProfilePicture user={isAuthenticated().user}/>

                    {/* <Link to={`/user/${isAuthenticated().user._id}`} 
                     style={
                     isActive(
                         history, 
                         `/user/${isAuthenticated().user._id}`
                         )}>
                    {isAuthenticated().user.name}
                    </Link>      */}
                    {/* <ul className="user_menu_dropdown">
                        <li>hola</li>
                        <li>hola</li>
                        <li>hola</li>
                        <li>hola</li>
                    </ul>       */}
                </div>         
            </li>
        </ul>
    </nav>
)
export default withRouter(User_navbar);