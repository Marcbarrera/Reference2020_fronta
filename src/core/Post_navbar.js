import React from 'react'
import {Link, withRouter} from 'react-router-dom'

const isActive = (history, path) => {
    if(history.location.pathname === path) return {color: "#ff9900"}
        else return {color: "#000000"}
}


const Post_navbar = ({history}) => (
    <nav className="post-navbar">
       <ul className="">
            <li className="categories-link">
                <Link style={isActive(history, "/categories")} to="/categories">Categories</Link>
                <ul className="dropdown">
                    <li>Music</li>
                    <li>Cinema</li>
                    <li>Painting</li>
                    <li>Photography</li>
                    <li>Literature</li>
                    <li>Fashion</li>
                </ul>
            </li>
            <li className="nav-items">
                <Link style={isActive(history, "/posts")} to="/posts">Posts</Link>
            </li>
            <li className="nav-items">
                <Link style={isActive(history, "/topposts")} to="/topposts">Top post</Link>
            </li>
            <li className="nav-items">
                <Link style={isActive(history, "/users")} to="/users">Users</Link>
            </li>
            <li className="nav-items">
                <Link style={isActive(history, "/writeapost")} to="/writeapost">Write a post</Link>
            </li>
            <li className="nav-items">
                <Link style={isActive(history, "/Myposts")} to="/myposts">My posts</Link>
            </li>
        </ul>
    </nav>
    
)
export default withRouter(Post_navbar);