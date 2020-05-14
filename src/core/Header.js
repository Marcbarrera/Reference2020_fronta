
import React from "react";
import User_navbar_out from './User_navbar_out';
import User_navbar_in from './User_navbar_in';
import Post_navbar from './Post_navbar'
import { Link, withRouter } from 'react-router-dom';
import {isAuthenticated} from '../auth/index';
import DrawerToggleButton from './SideDrawer/DrawerToggleBurger'


const Header = props => (
    <header>
        <div className="header-wrapper">
            <div className="top-header">
                <h1><Link to="/">Reference</Link></h1>
            </div>
            <div className="bottom-header">
                       
            <DrawerToggleButton click={props.drawerClickHandler}/> <Post_navbar/>   <div className="spacer"></div>  {isAuthenticated()? <User_navbar_in/>  : <User_navbar_out/> }
                {/* M'encanta aquest div class spacer */}
            </div>
       </div>
    </header>
)

export default withRouter(Header);