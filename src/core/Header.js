import React from "react";
import User_navbar from './User_navbar';
import Post_navbar from './Post_navbar'
import { Link } from 'react-router-dom';
const number = 2;

const Header = () => 

(
    
    <header>
        <div className="header-wrapper">
            <div className="top-header">
                <h1><Link to="/">Reference</Link></h1>
            </div>
            <div className="bottom-header">
                <Post_navbar/> {(number>1)? <User_navbar/>  : null }
            </div>
       </div>
    </header>

)

export default Header;