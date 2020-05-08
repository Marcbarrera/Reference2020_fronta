import React from "react";
import User_navbar_out from './User_navbar_out';
import User_navbar_in from './User_navbar_in';
import Post_navbar from './Post_navbar'
import { Link, withRouter } from 'react-router-dom';
import {isAuthenticated} from '../auth/index';


const Header = () => (
    <header>
        <div className="header-wrapper">
            <div className="top-header">
                <h1><Link to="/">Reference</Link></h1>
            </div>
            <div className="bottom-header">
                <Post_navbar/> {isAuthenticated()? <User_navbar_in/>  : <User_navbar_out/> }

            </div>
       </div>
    </header>
)

export default withRouter(Header);