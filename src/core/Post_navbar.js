import React from 'react'
import {Link, withRouter} from 'react-router-dom'

const isActive = (history, path) => {
    if(history.location.pathname === path) return {color: "#ff9900"}
        else return {color: "#000000"}
}


const Post_navbar = ({history}) => (
    <nav className="post-navbar">
       <ul className="">
            <li className="nav-items">
                <Link style={isActive(history, "/categories")} to="/categories">Categories</Link>
            </li>
            <li className="nav-items">
                <Link style={isActive(history, "/newestposts")} to="/newestposts">Newest posts</Link>
            </li>
            <li className="nav-items">
                <Link style={isActive(history, "/toppost")} to="/adeu">Top post</Link>
            </li>
            <li className="nav-items">
                <Link style={isActive(history, "/users")} to="/users">Users</Link>
            </li>
            <li className="nav-items">
                <Link style={isActive(history, "/post/created")} to="/post/created">Write a post</Link>
            </li>
            <li className="nav-items">
                <Link style={isActive(history, "/Myposts")} to="/myposts">My posts</Link>
            </li>
        </ul>
    </nav>
    
)
export default withRouter(Post_navbar);