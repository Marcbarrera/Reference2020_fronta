import React from 'react'
import {Link} from 'react-router-dom'

const Post_navbar = () => (
    <nav className="post-navbar">
        <Link to="/signin">Categories</Link>
        <Link to="/signup">Top post</Link>
    </nav>
)
export default Post_navbar;